export interface User {
   id: string
   title : string
   name : string
   created_at : string
}

export interface Project {
   id: string 
   title : string
   description : string | null 
   status: 'active' | 'completed' | 'archived'
   user_id : string
   created_at : string
}

export interface task {
   id: string
   title : string
   status : 'todo' | 'in_progress' | 'done'
   priority : 'low' | 'medium' | 'high'
   project_id : string
   created_at : string
}
