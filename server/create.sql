CREATE TABLE Users (
    userUID varchar(255),
    firstName varchar(255),
    lastName varchar(255),
    email varchar(255),
    dorm varchar(255),
    major varchar(255),
    imgBlob varchar(255),
    PRIMARY KEY(userUID)
); 

CREATE TABLE Boards (
    boardOwnerUID varchar(255),
    PRIMARY KEY (boardOwnerUID),
    FOREIGN KEY (boardOwnerUID) references Users(userUID)
    ON UPDATE NO ACTION 
    ON DELETE NO ACTION
);

CREATE TABLE Messages (
    commenterUID varchar(255), 
    boardOwnerUID varchar(255),
    messageUID varchar(255),
    messageContent varchar(512),
    color varchar(15),
    size varchar(15),
    x float,
    y float,
    PRIMARY KEY(messageUID),
    FOREIGN KEY(commenterUID) references Users(userUID)
    ON UPDATE NO ACTION 
    ON DELETE NO ACTION,
    FOREIGN KEY(boardOwnerUID) references Boards(boardOwnerUID)
    ON UPDATE NO ACTION 
    ON DELETE NO ACTION
); 
