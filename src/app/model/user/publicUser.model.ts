export class PublicUserModel {
  username: string;
  imageString: string;
  joinDate: string;

  groupsJoined: number;
  tasksCreated: number;
  tasksCompleted: number;
  activeTasks: number;


  constructor(username: string, imageString: string, joinDate: string, groupsJoined: number, tasksCreated: number, tasksCompleted: number, activeTasks: number) {
    this.username = username;
    this.imageString = imageString;
    this.joinDate = joinDate;
    this.groupsJoined = groupsJoined;
    this.tasksCreated = tasksCreated;
    this.tasksCompleted = tasksCompleted;
    this.activeTasks = activeTasks;
  }
}
