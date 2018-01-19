export class DefinedConstants {

public API_BASE_URL="http://localhost:9082";
public API_PROFILE = "/profile";
public API_USER_LOGIN="/userLogins";
public API_USER_SIGNUP ="/secure/logon/signUp";
public API_USER_SIGNIN ="/secure/logon/signIn";
public API_FINDBY_USERID="/userLogins/search/findByuserID?userID=";
public API_COURSES="/courses";
// Subjects API
public API_SUBJECTS="/subjects";
public API_SUBJECT_BY_NAME_FIND="/subjects/search/findBysubjectName?subjectName=";
// Questions API
public API_TOPICS="/topics";
public API_TOPIC="/topic"
public API_TOPIC_BY_NAME_FIND="/topics/search/findBytNm?tNm=";
public API_TOPIC_BY_SUBJECT="/topics/search/findBySubject?subject="
// Questions API
public API_QUESTIONS="/questions";
public API_FIND_QUESTION_BY_SUBJECT="/questions/search/findBySubject?subject=";
public API_FIND_QUESTION_BY_TAG="/questions/search/findByTagId?tagId=";
public API_FIND_QUESTION_BY_SUBJECT_A_TOPIC="/questions/search/findBySubjectAndTopic?subject=";
public API_FIND_QUESTION_BY_SUBJECT_A_TAG="/questions/search/findBySubjectAndTagId?subject=";
public API_FIND_QUESTION_BY_SUBJECT_A_TOPIC_A_TAG="/questions/search/findBySubjectAndTopicAndTagId?subject=";
public API_FIND_QUESTION_BY_SUBJECT_A_TOPIC_A_TAG_A_OPTIONTYP="/questions/search/findBySubjectAndTopicAndTagIdAndOptionType?subject=";

// Static Data to Populate
public DATA_QUESTION_CHOICE =[{"value":"sc","viewValue":"Single Choice"},{"value":"mc","viewValue":"Multiple Choice"}];
public DATA_LANGUAGES =[{"value":"eng","viewValue":"English"}];
public DATA_DIFFICULTY_LEVEL =[{"value":"beginner","viewValue":"Beginner"},{"value":"intermediate","viewValue":"Intermediate"},{"value":"pro","viewValue":"Pro"}];
public sscCourseList = ["CGL","CHSL","MTS"];
public QUESTIONS_HEADER=["SNo","QUESTIONTEXT","SUBJECTNAME","TOPICNAME","QUESTIONTYPE","OPTION1","OPTION2","OPTION3","OPTION4","OPTION5","OPTION6","CORRECTANSWER","EXPLANATION","DIFFICULTYLEVEL","QUESTIONTAGS"];
public slaCourseList = ["PO","Clerk","Assistant"];
public bfsiCourseList = ["Rajsthan","Delhi"];
public MAIN_PAGE_VIEW = "mainPageView";
public COURSE_VIEW =  "browseCourses";
public TEST_SERIES_VIEW = "testSeries";
public Q_Manager_View ="questionManager";
public Q_IMPORT_VIEW="importQuestionView";
public ADD_QUESTIONS_VIEW="addQuestionsView";
public ADD_COURSE = "Add COURSE";
public ADD_SUBJECT = "Add Subject";
public ADD_TOPIC = "Add Topic";
public ADD_EPLN= "Add Explanation";
public REMOVE_EPLN= "Remove Explanation";
public ADD_TAG= "Add Tag";
public REMOVE_TAG= "Remove Tag";
// Roles
public ROLE_ADMIN="A";
public ROLE_STUDENT="S";
public ROLE_TEACHER="T";
public ROLE_UNKNOWN="U";
}