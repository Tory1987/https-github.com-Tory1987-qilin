export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      app_config: {
        Row: {
          created_at: string
          key: string
          value: string
        }
        Insert: {
          created_at?: string
          key: string
          value: string
        }
        Update: {
          created_at?: string
          key?: string
          value?: string
        }
        Relationships: []
      }
      daily_quests: {
        Row: {
          completed: boolean
          created_at: string
          id: string
          progress: number
          quest_date: string
          quest_title: string
          quest_type: string
          target: number
          user_id: string
          xp_reward: number
        }
        Insert: {
          completed?: boolean
          created_at?: string
          id?: string
          progress?: number
          quest_date?: string
          quest_title: string
          quest_type: string
          target: number
          user_id: string
          xp_reward?: number
        }
        Update: {
          completed?: boolean
          created_at?: string
          id?: string
          progress?: number
          quest_date?: string
          quest_title?: string
          quest_type?: string
          target?: number
          user_id?: string
          xp_reward?: number
        }
        Relationships: []
      }
      duel_answers: {
        Row: {
          answer: Json
          created_at: string
          duel_id: string
          exercise_index: number
          id: string
          is_correct: boolean
          time_ms: number
          user_id: string
        }
        Insert: {
          answer: Json
          created_at?: string
          duel_id: string
          exercise_index: number
          id?: string
          is_correct?: boolean
          time_ms?: number
          user_id: string
        }
        Update: {
          answer?: Json
          created_at?: string
          duel_id?: string
          exercise_index?: number
          id?: string
          is_correct?: boolean
          time_ms?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "duel_answers_duel_id_fkey"
            columns: ["duel_id"]
            isOneToOne: false
            referencedRelation: "duels"
            referencedColumns: ["id"]
          },
        ]
      }
      duel_stats: {
        Row: {
          best_streak: number
          created_at: string
          draws: number
          id: string
          losses: number
          rating: number
          updated_at: string
          user_id: string
          win_streak: number
          wins: number
        }
        Insert: {
          best_streak?: number
          created_at?: string
          draws?: number
          id?: string
          losses?: number
          rating?: number
          updated_at?: string
          user_id: string
          win_streak?: number
          wins?: number
        }
        Update: {
          best_streak?: number
          created_at?: string
          draws?: number
          id?: string
          losses?: number
          rating?: number
          updated_at?: string
          user_id?: string
          win_streak?: number
          wins?: number
        }
        Relationships: []
      }
      duels: {
        Row: {
          challenger_id: string
          challenger_score: number
          challenger_time_ms: number
          completed_at: string | null
          created_at: string
          exercises: Json
          id: string
          mode: Database["public"]["Enums"]["duel_mode"]
          opponent_id: string | null
          opponent_score: number
          opponent_time_ms: number
          room_code: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["duel_status"]
          total_questions: number
          winner_id: string | null
          xp_reward: number
        }
        Insert: {
          challenger_id: string
          challenger_score?: number
          challenger_time_ms?: number
          completed_at?: string | null
          created_at?: string
          exercises?: Json
          id?: string
          mode?: Database["public"]["Enums"]["duel_mode"]
          opponent_id?: string | null
          opponent_score?: number
          opponent_time_ms?: number
          room_code?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["duel_status"]
          total_questions?: number
          winner_id?: string | null
          xp_reward?: number
        }
        Update: {
          challenger_id?: string
          challenger_score?: number
          challenger_time_ms?: number
          completed_at?: string | null
          created_at?: string
          exercises?: Json
          id?: string
          mode?: Database["public"]["Enums"]["duel_mode"]
          opponent_id?: string | null
          opponent_score?: number
          opponent_time_ms?: number
          room_code?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["duel_status"]
          total_questions?: number
          winner_id?: string | null
          xp_reward?: number
        }
        Relationships: []
      }
      exercise_reviews: {
        Row: {
          correct_answer: Json
          created_at: string
          ease_factor: number
          exercise_id: string
          exercise_type: string
          explanation: string | null
          id: string
          interval_days: number
          last_reviewed_at: string | null
          lesson_id: string
          next_review_date: string
          options: Json | null
          question: string
          repetitions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          correct_answer: Json
          created_at?: string
          ease_factor?: number
          exercise_id: string
          exercise_type: string
          explanation?: string | null
          id?: string
          interval_days?: number
          last_reviewed_at?: string | null
          lesson_id: string
          next_review_date?: string
          options?: Json | null
          question: string
          repetitions?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          correct_answer?: Json
          created_at?: string
          ease_factor?: number
          exercise_id?: string
          exercise_type?: string
          explanation?: string | null
          id?: string
          interval_days?: number
          last_reviewed_at?: string | null
          lesson_id?: string
          next_review_date?: string
          options?: Json | null
          question?: string
          repetitions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          chinese_level: string | null
          created_at: string
          daily_goal_minutes: number
          display_name: string | null
          id: string
          onboarding_completed: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          chinese_level?: string | null
          created_at?: string
          daily_goal_minutes?: number
          display_name?: string | null
          id?: string
          onboarding_completed?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          chinese_level?: string | null
          created_at?: string
          daily_goal_minutes?: number
          display_name?: string | null
          id?: string
          onboarding_completed?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount: number
          created_at: string
          expires_at: string | null
          hearts_qty: number | null
          id: string
          metadata: Json | null
          order_code: string | null
          status: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          expires_at?: string | null
          hearts_qty?: number | null
          id?: string
          metadata?: Json | null
          order_code?: string | null
          status?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          expires_at?: string | null
          hearts_qty?: number | null
          id?: string
          metadata?: Json | null
          order_code?: string | null
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          badges: string[]
          completed_lessons: string[]
          created_at: string
          crown_levels: Json
          current_book: number
          current_lesson: number
          hearts: number
          id: string
          last_study_date: string | null
          level: number
          max_hearts: number
          premium_until: string | null
          streak: number
          updated_at: string
          user_id: string
          vocabulary_mastered: string[]
          weekly_xp: number
          weekly_xp_reset_at: string
          xp: number
        }
        Insert: {
          badges?: string[]
          completed_lessons?: string[]
          created_at?: string
          crown_levels?: Json
          current_book?: number
          current_lesson?: number
          hearts?: number
          id?: string
          last_study_date?: string | null
          level?: number
          max_hearts?: number
          premium_until?: string | null
          streak?: number
          updated_at?: string
          user_id: string
          vocabulary_mastered?: string[]
          weekly_xp?: number
          weekly_xp_reset_at?: string
          xp?: number
        }
        Update: {
          badges?: string[]
          completed_lessons?: string[]
          created_at?: string
          crown_levels?: Json
          current_book?: number
          current_lesson?: number
          hearts?: number
          id?: string
          last_study_date?: string | null
          level?: number
          max_hearts?: number
          premium_until?: string | null
          streak?: number
          updated_at?: string
          user_id?: string
          vocabulary_mastered?: string[]
          weekly_xp?: number
          weekly_xp_reset_at?: string
          xp?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vocabulary_reviews: {
        Row: {
          created_at: string
          ease_factor: number
          id: string
          interval_days: number
          last_reviewed_at: string | null
          next_review_date: string
          repetitions: number
          updated_at: string
          user_id: string
          word_example: string | null
          word_example_meaning: string | null
          word_id: string
          word_meaning: string
          word_pinyin: string
          word_traditional: string
        }
        Insert: {
          created_at?: string
          ease_factor?: number
          id?: string
          interval_days?: number
          last_reviewed_at?: string | null
          next_review_date?: string
          repetitions?: number
          updated_at?: string
          user_id: string
          word_example?: string | null
          word_example_meaning?: string | null
          word_id: string
          word_meaning: string
          word_pinyin: string
          word_traditional: string
        }
        Update: {
          created_at?: string
          ease_factor?: number
          id?: string
          interval_days?: number
          last_reviewed_at?: string | null
          next_review_date?: string
          repetitions?: number
          updated_at?: string
          user_id?: string
          word_example?: string | null
          word_example_meaning?: string | null
          word_id?: string
          word_meaning?: string
          word_pinyin?: string
          word_traditional?: string
        }
        Relationships: []
      }
    }
    Views: {
      duel_leaderboard_view: {
        Row: {
          avatar_url: string | null
          best_streak: number | null
          display_name: string | null
          draws: number | null
          losses: number | null
          rating: number | null
          user_id: string | null
          win_streak: number | null
          wins: number | null
        }
        Relationships: []
      }
      leaderboard_view: {
        Row: {
          avatar_url: string | null
          completed_lessons_count: number | null
          display_name: string | null
          level: number | null
          streak: number | null
          user_id: string | null
          weekly_xp: number | null
          weekly_xp_reset_at: string | null
          xp: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      regen_hearts: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "user"
      duel_mode: "realtime" | "turnbased"
      duel_status: "pending" | "active" | "completed" | "declined" | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      duel_mode: ["realtime", "turnbased"],
      duel_status: ["pending", "active", "completed", "declined", "expired"],
    },
  },
} as const
