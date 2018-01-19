export class Courses{
  public cNm:string;
  public cDesc:string;
}

export class Subjects{
  public subjectName:string;
  public subjectDesc:string;
  public clas:string;
  public basePrice:string;
  public topic:string;
}

export class Topic{
  public tNm:string;
  public tDesc:string;
  public basePrice:string;
  public subject:string;
  public question:string;
}

export class Question{
  public question:string;
  public optionType:string;
  public answers;
  public difficultyLevel;
  public langCd:string;
  public expln:string;
  public tagId:string;
  public subject:string;
  public topic:string;
  public correctAns:string;
}

export class Answers{
  public text:string;
  public index
}