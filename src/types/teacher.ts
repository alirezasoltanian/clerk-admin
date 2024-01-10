export interface Teacher {
  uuid: string
  name: string
  birthday: string
  email: string
  resume: string
  status: string
  has_diy: boolean
  has_course: boolean
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

export interface DIYInShell {
  uuid: string
  name: string
  image: string
  status: string
}

export interface TeacherPreview {
  name: string
  image: string
  banner: string
}
export interface DIYTeacher {
  uuid: string
  name: string
  image: string
}

export interface Diy {
  uuid: string
  title: string
  tags: string[]
  is_published: boolean
  category_uuid: string
  subcategory_uuid: string
  description: string
  attach_file: string
  video: string
  image: string
}
