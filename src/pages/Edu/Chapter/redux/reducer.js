
import { 
  GET_ALL_COURSE_LIST,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
  BATCH_REMOVE_LESSON_LIST,
  BATCH_REMOVE_CHAPTER_LIST } from "./constants";

const initChapter = {
  allCourseList:[],
  chapters: {
    total: 0,
    items: [],
  },
};

export default function chapter(prevState = initChapter, action) {
  //所有课程数据
  switch (action.type) {
    case GET_ALL_COURSE_LIST:
      return {
        ...prevState,
        allCourseList: action.data,
      }
  //章节数据
  case GET_CHAPTER_LIST:
    return {
      ...prevState,
      chapters:{
        total:action.data.total,
        items:action.data.items.map((chapter)=>{
          return{
            ...chapter,
            children:[],
          }
        })
      }
    }
    //课时数据
    case GET_LESSON_LIST:
      return {
        ...prevState,
        chapters:{
          total: prevState.chapters.total,
          items: prevState.chapters.items.map((chapter)=>{
            if(chapter._id===action.data.chapterId){
              return{
                ...chapter,
                children:action.data.lessons,
              }
            }
            return chapter
          })
        }
      }
    //批量删除课时
    case BATCH_REMOVE_LESSON_LIST:
      return{
        ...prevState,
        chapters:{
          total: prevState.chapters.total,
          items: prevState.chapters.items.map((chapter)=>{
            let children=chapter.children
            if(children && children.length){
              children=children.filter(
                (item)=>action.data.indexOf(item._id)===-1
              )
            }
            return {
              ...chapter,
              children,
            }
          })
        }
      }
    //批量删除章节
    // case BATCH_REMOVE_CHAPTER_LIST:
    //   return{
    //     ...prevState,
    //     chapters:{
    //       total: prevState.chapters.total,
    //       items: prevState.chapters.items.map((chapter)=>{
    //         if(!children && children.length){
    //           chapter.filter(
    //             (item)=>action.data.indexOf(item._id)===-1
    //           )
    //         }
    //         return {
    //           ...chapter,
    //         }
    //       })
    //     }
    //   }
    default:
      return prevState
  }
}
