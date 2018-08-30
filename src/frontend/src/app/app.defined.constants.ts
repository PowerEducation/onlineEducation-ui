export class DefinedConstants {

public homePageURL="http://localhost:4200/home"
// public API_BASE_URL="http://103.50.212.118:9082";
public API_BASE_URL="http://localhost:9082";
public API_PROFILE = "/profile";
public API_USER_LOGIN="/userLogins";
public API_USER_SIGNUP ="/secure/logon/signUp";
public API_USER_SIGNIN ="/secure/logon/signIn";
public API_FINDBY_USERID="/userLogins/search/findByuserID?userID=";
public API_COURSES="/courses";
public idleTimeOut=600; //in Sec
public finalTimOut=30;
// Subjects API
public API_SUBJECTS="/subjects";
public API_SUBJECT_BY_NAME_FIND="/subjects/search/findBysubjectName?subjectName=";
// Topics API
public API_TOPICS="/topics";
public API_TOPIC="/topic"
public API_TOPIC_BY_NAME_FIND="/topics/search/findBytNm?tNm=";
public API_TOPIC_BY_SUBJECT="/topics/search/findBySubject?subject="
// Questions API
public API_QUESTIONS="/questions";
public API_FIND_QUESTION_BY_SUBJECT="/questions/search/findBySubject?subject=";
public API_FIND_QUESTION_BY_TAG="/questions/search/findByTagId?tagId=";
public API_FIND_QUESTION_BY_SUBJECT_A_TOPIC="/questions/search/findBySubjectAndTopic?subject=";
public API_FIND_QUESTION_BY_SUBJECT_A_TOPIC_A_OPTIONTYP="/questions/search/findBySubjectAndTopicAndOptionType?subject="
public API_FIND_QUESTION_BY_SUBJECT_A_TAG="/questions/search/findBySubjectAndTagId?subject=";
public API_FIND_QUESTION_BY_SUBJECT_A_TOPIC_A_TAG="/questions/search/findBySubjectAndTopicAndTagId?subject=";
public API_FIND_QUESTION_BY_SUBJECT_A_TOPIC_A_TAG_A_OPTIONTYP="/questions/search/findBySubjectAndTopicAndTagIdAndOptionType?subject=";

//Category API
public API_TEST_CATEGORY =  "/testProducts";

//TEST API
public API_TEST =  "/tests";
public API_FIND_BY_TEST_NAME="/tests/search/findByTestName?testName=";
public API_ADD_TO_TEST = "/secure/power/addQuestionToTest";
public API_UPDATE_TEST_STATUS = "/secure/power/updateTestStatus";
public API_REMOVE_FROM_TEST = "/secure/power/removeQuestionFromTest";
public API_FIND_TEST_BY_CATE = "/tests/search/findByCategory?category=";
public API_FIND_TEST_BY_TESTNAME="/tests/search/findByTestName?testName=";
public API_FIND_TEST_BY_TESTNAME_CATE="/tests/search/findByTestNameAndCategory?testName=";
public API_TEST_UPLOAD="/secure/power/uploadImage";
public API_TEST_FIND_STATUS="/tests/search/findByStatus?status=";
public API_GET_ALL_QUESTION_FROM_TEST="/secure/power/getAllQuestionFromTest";

// Static Data to Populate
public DATA_QUESTION_CHOICE =[{"value":"sc","viewValue":"Single Choice"},{"value":"mc","viewValue":"Multiple Choice"}];
public DATA_LANGUAGES =[{"value":"eng","viewValue":"English"}];
public DATA_DIFFICULTY_LEVEL =[{"value":"beginner","viewValue":"Beginner"},{"value":"intermediate","viewValue":"Intermediate"},{"value":"pro","viewValue":"Pro"}];
public sscCourseList = ["CGL","CHSL","MTS"];
public QUESTIONS_HEADER_old=["SNo","QUESTIONTEXT","QUESTIONTEXTH","SUBJECTNAME","TOPICNAME","QUESTIONTYPE","OPTION1","OPTION1H","OPTION2","OPTION2H","OPTION3","OPTION3H","OPTION4","OPTION4H","OPTION5","OPTION5H","OPTION6","OPTION6H","CORRECTANSWER","EXPLANATION","DIFFICULTYLEVEL","QUESTIONTAGS"];
public QUESTIONS_HEADER=["SNo","QUESTIONTEXT","SUBJECTNAME","TOPICNAME","QUESTIONTYPE","OPTION1","OPTION2","OPTION3","OPTION4","OPTION5","OPTION6","CORRECTANSWER","EXPLANATION","DIFFICULTYLEVEL","QUESTIONTAGS"];
public slaCourseList = ["PO","Clerk","Assistant"];
public bfsiCourseList = ["Rajsthan","Delhi"];
public MAIN_PAGE_VIEW = "mainPageView";
public COURSE_VIEW =  "browseCourses";
public TEST_SERIES_VIEW = "testSeries";
public TEST_PREVIEW="beginTestView";
public TEST_MANAGER_VIEW="testManagerView";
public TEST_CATEGORY_VIEW="addProductView";
public Q_Manager_View ="questionManager";
public Q_IMPORT_VIEW="importQuestionView";
public Q_ENTITY_VIEW="manageEntityView";
public ALL_TEST_VIEW="allTestsView";
public ADD_QUESTIONS_VIEW="addQuestionsView";
public ADD_COURSE = "Add COURSE";
public ADD_SUBJECT = "Add Subject";
public ADD_TOPIC = "Add Topic";
public ADD_EPLN= "Add Explanation";
public REMOVE_EPLN= "Remove Explanation";
public ADD_TAG= "Add Tag";
public REMOVE_TAG= "Remove Tag";
public ADD_CATEGORY= "Add Category";
public SOURCE_TEST_M="testManager";
// Roles
public ROLE_ADMIN="A";
public ROLE_STUDENT="S";
public ROLE_TEACHER="T";
public ROLE_UNKNOWN="U";

// Status
public STATUS_PENDING="Pending";
public STATUS_ACTIVE="Active";
public STATUS_INACTIVE="In-Active";

public BUTTON_UNANS="unAns";
public BUTTON_ANS="ans";
public BUTTON_TAGGED="tagged";
public BUTTON_SKIPPED="skipped";
public BUTTON_TAGGED_ANSWERED="primary";
}