export interface Teacher {
  uuid: string
  name: string
  birthday: string
  email: string
  resume: string
  status: string
}

export interface FormTeacher {
  full_name: string
  graduated_university: string
  bio: string
  birth_date: string
  degree_of_education: string
  description_for_admin: string
  email: string
  is_accepted_policies: boolean
  phone_number: string
  studying_history?: {
    place: string
    start: string
    end: string
    field: string
  }[]
  teaching_fields?: string[]
  teaching_history?: {
    place: string
    start: string
    end: string
    field: string
  }[]
  resume_url?: string
  image_url?: string
  banner_url?: string
}
