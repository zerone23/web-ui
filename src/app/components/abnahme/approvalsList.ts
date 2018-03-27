export class ApprovalsList {
    sheetNr:number;
    deadline:number;
    approvals:approval[];
}

interface approval{
    approved:boolean;
    simley:boolean;
    comment:string;
    supervisor:string;
}

interface task{
    taskNr:string;
}