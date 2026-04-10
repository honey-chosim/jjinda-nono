export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      invite_codes: {
        Row: {
          id: string
          code: string
          created_by: string | null
          used_by: string | null
          used_at: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          created_by?: string | null
          used_by?: string | null
          used_at?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          created_by?: string | null
          used_by?: string | null
          used_at?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          name: string
          phone: string | null
          gender: 'male' | 'female'
          birth_year: number
          birth_month: number
          birth_day: number
          height: number | null
          education: string | null
          school: string | null
          company: string | null
          job_title: string | null
          residence_city: string | null
          residence_district: string | null
          smoking: '비흡연' | '흡연' | '금연 중' | null
          drinking: '안 마심' | '사회적 음주' | '즐겨 마심' | null
          mbti: string | null
          hobbies: string[]
          pet: '없음' | '강아지' | '고양이' | '기타' | null
          bio: string | null
          photos: string[]
          preferred_age_min: number | null
          preferred_age_max: number | null
          preferred_height_min: number | null
          preferred_residence: string[]
          preferred_free_text: string | null
          is_active: boolean
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          phone?: string | null
          gender: 'male' | 'female'
          birth_year: number
          birth_month: number
          birth_day: number
          height?: number | null
          education?: string | null
          school?: string | null
          company?: string | null
          job_title?: string | null
          residence_city?: string | null
          residence_district?: string | null
          smoking?: '비흡연' | '흡연' | '금연 중' | null
          drinking?: '안 마심' | '사회적 음주' | '즐겨 마심' | null
          mbti?: string | null
          hobbies?: string[]
          pet?: '없음' | '강아지' | '고양이' | '기타' | null
          bio?: string | null
          photos?: string[]
          preferred_age_min?: number | null
          preferred_age_max?: number | null
          preferred_height_min?: number | null
          preferred_residence?: string[]
          preferred_free_text?: string | null
          is_active?: boolean
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          gender?: 'male' | 'female'
          birth_year?: number
          birth_month?: number
          birth_day?: number
          height?: number | null
          education?: string | null
          school?: string | null
          company?: string | null
          job_title?: string | null
          residence_city?: string | null
          residence_district?: string | null
          smoking?: '비흡연' | '흡연' | '금연 중' | null
          drinking?: '안 마심' | '사회적 음주' | '즐겨 마심' | null
          mbti?: string | null
          hobbies?: string[]
          pet?: '없음' | '강아지' | '고양이' | '기타' | null
          bio?: string | null
          photos?: string[]
          preferred_age_min?: number | null
          preferred_age_max?: number | null
          preferred_height_min?: number | null
          preferred_residence?: string[]
          preferred_free_text?: string | null
          is_active?: boolean
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      dating_requests: {
        Row: {
          id: string
          requester_id: string
          target_id: string
          status: 'pending' | 'accepted' | 'rejected' | 'expired'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          requester_id: string
          target_id: string
          status?: 'pending' | 'accepted' | 'rejected' | 'expired'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          requester_id?: string
          target_id?: string
          status?: 'pending' | 'accepted' | 'rejected' | 'expired'
          created_at?: string
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          request_id: string
          user1_id: string
          user2_id: string
          payment_status: 'pending' | 'paid'
          kakao_group_created: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          request_id: string
          user1_id: string
          user2_id: string
          payment_status?: 'pending' | 'paid'
          kakao_group_created?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          request_id?: string
          user1_id?: string
          user2_id?: string
          payment_status?: 'pending' | 'paid'
          kakao_group_created?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      daily_request_limits: {
        Row: {
          id: string
          user_id: string
          request_date: string
        }
        Insert: {
          id?: string
          user_id: string
          request_date?: string
        }
        Update: {
          id?: string
          user_id?: string
          request_date?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Convenience aliases
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type DatingRequest = Database['public']['Tables']['dating_requests']['Row']
export type DatingRequestInsert = Database['public']['Tables']['dating_requests']['Insert']

export type Match = Database['public']['Tables']['matches']['Row']

export type InviteCode = Database['public']['Tables']['invite_codes']['Row']

// Profile with computed fields for UI
export interface ProfileView extends Profile {
  age: number
  residence: string
}

// Request with requester profile joined
export interface RequestWithRequester extends DatingRequest {
  requester: Profile
}

// Match with both profiles joined
export interface MatchWithProfiles extends Match {
  user1: Profile
  user2: Profile
  request: DatingRequest
}
