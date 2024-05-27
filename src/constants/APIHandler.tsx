import {
  DOMAIN
} from "@env";

const domain = DOMAIN

const auth_route = domain + "/user/login";

const user_details = domain + "/user/details";

const profile_details = domain + "/data/profile";

const bank_details = domain + "/data/bank_details";

const update_bank_details = domain + "/data/update_bank_details";

const transcript_details = domain + "/data/transcript";

const courses_details = domain + "/data/courses";

const attendance_details = domain + "/data/attendance";

const past_leave_status = domain + "/data/leave_requests";

const apply_leave = domain + "/data/new_leave_request";

const course_attendance = domain + "/data/attendance/";

export {
  domain,
  auth_route,
  user_details,
  profile_details,
  bank_details,
  update_bank_details,
  transcript_details,
  course_attendance,
  courses_details,
  attendance_details,
  past_leave_status,
  apply_leave,
};
