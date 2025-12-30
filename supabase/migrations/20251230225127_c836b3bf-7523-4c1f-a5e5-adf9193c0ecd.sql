-- Table pour les logs d'activité
CREATE TABLE public.activity_logs (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    action text NOT NULL,
    entity_type text NOT NULL,
    entity_id uuid,
    details jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_entity_type ON public.activity_logs(entity_type);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Seuls les admins peuvent voir les logs
CREATE POLICY "Admins can view all logs"
ON public.activity_logs
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Seuls les admins peuvent insérer des logs
CREATE POLICY "Admins can insert logs"
ON public.activity_logs
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Fonction pour logger automatiquement les actions sur les visas
CREATE OR REPLACE FUNCTION public.log_visa_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    action_type text;
    details_json jsonb;
BEGIN
    IF TG_OP = 'INSERT' THEN
        action_type := 'create';
        details_json := jsonb_build_object(
            'full_name', NEW.full_name,
            'passport_number', NEW.passport_number,
            'status', NEW.status
        );
        INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, details)
        VALUES (auth.uid(), action_type, 'visa', NEW.id, details_json);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        action_type := 'update';
        details_json := jsonb_build_object(
            'full_name', NEW.full_name,
            'old_status', OLD.status,
            'new_status', NEW.status,
            'changes', jsonb_build_object(
                'full_name', CASE WHEN OLD.full_name != NEW.full_name THEN jsonb_build_object('old', OLD.full_name, 'new', NEW.full_name) ELSE NULL END,
                'status', CASE WHEN OLD.status != NEW.status THEN jsonb_build_object('old', OLD.status, 'new', NEW.status) ELSE NULL END
            )
        );
        INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, details)
        VALUES (auth.uid(), action_type, 'visa', NEW.id, details_json);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        action_type := 'delete';
        details_json := jsonb_build_object(
            'full_name', OLD.full_name,
            'passport_number', OLD.passport_number,
            'status', OLD.status
        );
        INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, details)
        VALUES (auth.uid(), action_type, 'visa', OLD.id, details_json);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

-- Trigger pour les changements sur les visas
CREATE TRIGGER on_visa_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.visas
    FOR EACH ROW
    EXECUTE FUNCTION public.log_visa_changes();

-- Fonction pour logger les changements de rôles
CREATE OR REPLACE FUNCTION public.log_role_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    action_type text;
    details_json jsonb;
BEGIN
    IF TG_OP = 'INSERT' THEN
        action_type := 'grant_role';
        details_json := jsonb_build_object('role', NEW.role, 'target_user_id', NEW.user_id);
        INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, details)
        VALUES (auth.uid(), action_type, 'user_role', NEW.id, details_json);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        action_type := 'revoke_role';
        details_json := jsonb_build_object('role', OLD.role, 'target_user_id', OLD.user_id);
        INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, details)
        VALUES (auth.uid(), action_type, 'user_role', OLD.id, details_json);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

-- Trigger pour les changements de rôles
CREATE TRIGGER on_role_changes
    AFTER INSERT OR DELETE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.log_role_changes();