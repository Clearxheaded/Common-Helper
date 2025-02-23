export interface Subject {
  subject_id: string
  created_at: string
  sub_name: string
  equiv_name: string
  perc_match: number
  text_description: string
}

export interface MainRecord {
  id: string
  created_at: string
  selected_system: 'matric' | 'a-levels'
  country: string
  gpa: number | null
  subject_id_1: string | null
  subject_id_2: string | null
  subject_id_3: string | null
  subject_id_4: string | null
} 