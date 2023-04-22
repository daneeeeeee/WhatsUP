// Author: fiVe
// Description: Automate methods

import { GenerateAbout } from "./GenerateAbout.js";
import { GeneratePost } from "./GeneratePost.js";
import { GeneratePostMap } from "./GeneratePostMap.js";
import { GenerateProfileSearch } from "./GenerateProfileSearch.js";
import { GenerateThread } from "./GenerateThread.js";
import { SideNavBar } from "./SideNavbar.js";

export class FeedGenerator {

    constructor() {
        // GLOBAL VARIABLES
        this.mapAPI          = new GeneratePostMap();
        this.hasThreadsArray = [];
    }

    getHasThreadsArray() {
        return this.hasThreadsArray;
    }

    appendToHasThreadsArray(obj) {
        this.getHasThreadsArray().push(obj);
    }

    generateProfile(jsonData) {
        let genProfile = new GenerateProfileSearch();

        for(let i = 0; i < jsonData.length; i++) {
            let profileName        = jsonData[i].profile_name,
                profileImage       = jsonData[i].profile_image,
                profileCategory    = jsonData[i].profile_category,
                profileDescription = jsonData[i].profile_description;
            
            genProfile.generateProfile(profileImage, profileName, profileCategory, 
                                       profileDescription);
        }
    }

    initializeSideNavBar() {
        let sideNavBar = new SideNavBar();
        
        document.getElementById("hamburger-button").onclick = function() {
            sideNavBar.hamburgerToggler();
        };
    }

    generateDefaultPostThread(jsonData) {
        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]
        for(let i = 0; i < jsonData.length; i++) {
            let id              = jsonData[i].id,
                profileName     = jsonData[i].profile_name,
                profilePic      = jsonData[i].profile_pic,
                dateTime        = jsonData[i].date_time, 
                post            = jsonData[i].post, 
                postMedia       = jsonData[i].post_media.file,
                postMediaType   = jsonData[i].post_media.type,
                postCoordinates = jsonData[i].post_coordinates,
                tags            = jsonData[i].tags,
                hasThread       = jsonData[i].has_thread,
                type            = jsonData[i].type;
            
            let generatePost = new GeneratePost(id, profileName, profilePic, 
                               dateTime, post, postMedia, postMediaType, 
                               postCoordinates, this.mapAPI, tags, hasThread, 
                               type);
            
            generatePost.showDefault();

            if(generatePost.getThreadObject() != null) {
                this.appendToHasThreadsArray(generatePost.getThreadObject());
            }
        }
    }

    generatePost(objectData) {
        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]
        let postID          = objectData.id,
            profileName     = objectData.profile_name,
            profilePic      = objectData.profile_pic,
            dateTime        = objectData.date_time,
            post            = objectData.post,
            postMedia       = objectData.post_media.file,
            postMediaType   = objectData.post_media.type,
            postCoordinates = objectData.post_coordinates,
            tags            = objectData.tags;
        
        new GeneratePost(postID, profileName, profilePic, dateTime, post, 
                        postMedia, postMediaType, postCoordinates, 
                        this.mapAPI, tags).showThreadView();
    }

    generateThread(jsonData) {
        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]
        for(let i = 0; i < jsonData.length; i++) {
            let threadID        = jsonData[i].id,
                postID          = jsonData[i].post_id,
                profileName     = jsonData[i].profile_name,
                profilePic      = jsonData[i].profile_pic,
                dateTime        = jsonData[i].date_time,
                post            = jsonData[i].post,
                postMedia       = jsonData[i].post_media.file,
                postMediaType   = jsonData[i].post_media.type,
                postCoordinates = jsonData[i].post_coordinates;

            new GenerateThread(threadID, postID, profileName, profilePic, dateTime, post, 
                               postMedia, postMediaType, postCoordinates, 
                               this.mapAPI).createThread();
        }        
    }

    generateAbout(jsonData) {
        let profileName = jsonData[0].profile_name,
            details     = jsonData[0].details,
            category    = jsonData[0].category,
            contact     = jsonData[0].contact,
            socials     = jsonData[0].socials;
        new GenerateAbout(profileName, details, category, contact, socials);
    }

}