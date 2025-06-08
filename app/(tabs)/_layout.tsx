import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import type { Session } from '@supabase/supabase-js';
import { TabLayout } from '../../components/Tabs/TabLayout';

export default function ProtectedTabLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;

  // if (!session) return <Redirect href="/login" />;

  return <TabLayout />;
}
