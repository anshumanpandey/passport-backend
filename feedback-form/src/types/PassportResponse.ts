export interface PassportResponse {
    id:          number;
    name:        string;
    createdAt:   Date;
    updatedAt:   Date;
    UserId:      number;
    User:        User;
    Achivements: Achivement[];
}

export interface Achivement {
    id:                 number;
    title:              string;
    month:              string;
    year:               string;
    company:            string;
    description:        string;
    titleObteined:      string;
    resultObteined:     string;
    valueObteined:      string;
    awardFilename:      null;
    createdAt:          Date;
    updatedAt:          Date;
    UserId:             number;
    PassportAchivement: PassportAchivement;
    Feedbacks:          any[];
}

export interface PassportAchivement {
    createdAt:    Date;
    updatedAt:    Date;
    PassportId:   number;
    AchivementId: number;
}

export interface User {
    id:           number;
    firstName:    string;
    lastName:     string;
    email:        string;
    password:     string;
    phoneNumber:  string;
    companyTitle: string | null;
    companyName:  string | null;
    profilePic:   string | null;
    createdAt:    Date;
    updatedAt:    Date;
}