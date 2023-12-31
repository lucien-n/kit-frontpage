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
      repos: {
        Row: {
          commit_author: string | null
          commit_date: string | null
          commit_message: string | null
          created_at: string | null
          name: string
          uid: string
        }
        Insert: {
          commit_author?: string | null
          commit_date?: string | null
          commit_message?: string | null
          created_at?: string | null
          name: string
          uid?: string
        }
        Update: {
          commit_author?: string | null
          commit_date?: string | null
          commit_message?: string | null
          created_at?: string | null
          name?: string
          uid?: string
        }
        Relationships: []
      }
      views: {
        Row: {
          count: number | null
          created_at: string | null
          id: number
          ignore: boolean | null
          info: string | null
          ip: string
          last_viewed: string | null
          uid: string
        }
        Insert: {
          count?: number | null
          created_at?: string | null
          id?: number
          ignore?: boolean | null
          info?: string | null
          ip: string
          last_viewed?: string | null
          uid?: string
        }
        Update: {
          count?: number | null
          created_at?: string | null
          id?: number
          ignore?: boolean | null
          info?: string | null
          ip?: string
          last_viewed?: string | null
          uid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_view_count: {
        Args: {
          client_ip: string
        }
        Returns: undefined
      }
      total_views: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
