export class PrivateUserModel {
  id: string;
  username: string;
  email: string;
  imageString: string;
  joinDate: string;

  groupsJoined: number;
  tasksCreated: number;
  tasksCompleted: number;
  activeTasks: number;


  constructor(id: string, username: string, email: string, imageString: string, joinDate: string, groupsJoined: number, tasksCreated: number, tasksCompleted: number, activeTasks: number) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.imageString = imageString;
    this.joinDate = joinDate;
    this.groupsJoined = groupsJoined;
    this.tasksCreated = tasksCreated;
    this.tasksCompleted = tasksCompleted;
    this.activeTasks = activeTasks;
  }
}
