export type TeacherMapLocation = {
  teacherid: string;
  longitude: string;
  latitude: string;
  locationtime: string;
};

export type TeacherOnMap = {
  id: string;
  firstname: string;
  lastname: string;
  classname: string;
  location: TeacherMapLocation | null;
};

export type StudentOnMap = {
  id: string;
  firstname: string;
  lastname: string;
  classname: string;
  longitude: string | null;
  latitude: string | null;
  locationtime: string | null;
};

export type TeacherMapResponse = {
  teacher: TeacherOnMap;
  students: StudentOnMap[];
};