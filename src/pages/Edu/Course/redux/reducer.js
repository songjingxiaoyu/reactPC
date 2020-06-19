
import { GET_COURSE_LIST} from "./constants";

const initCourseList = {
  total: 0,
  items: [],
};

export default function courseList(prevState = initCourseList, action) {
  //所有课程数据
  switch (action.type) {
    case GET_COURSE_LIST:
      return action.data
    default:
      return prevState
  }
}
