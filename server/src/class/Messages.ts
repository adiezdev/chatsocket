import { Users } from "./Users";

type TMessage = {
    id: string;
    user: string;
    text: string;
}
export class Messages {

    private messages: Array<TMessage> = [];
    public text: string = "";
    private user: Users;

    constructor(user:Users) {
        this.user = user;
    }

    public addMessage(text: string, id: string): void {
        this.messages.push({
            id: this.messages.length.toString(),
            user: this.user.getUser(id),
            text: text
        });
    }
    public getMessagesUser(user: string): TMessage[] {
        return this.messages.filter(message => message.user === user);
    }
    
}