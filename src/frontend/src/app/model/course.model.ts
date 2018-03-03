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

export class Category{
  public pNm:string;
  public pDesc:string;
  public pMode:string;
  public test:String;
}

export class Test{
  public qCount:string;
	public questionIds:string;
	public duration:number;
	public createdBy:string;
	public lastAccessts:string;
	public diificultyLevel:number;
	public testName:string;
	public testDesc:string;
	public basePriceTest:string;
	public status:string;
	public percentNegative:number;
	public totalMarks:number;
	public category:string;
	public testProduct:string;
  public addIfNotExists:boolean;
}