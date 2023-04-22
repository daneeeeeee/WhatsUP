// Author: fiVe
// Description: JavaScript for ProfilePage

import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { FeedGenerator } from "./classes/FeedGenerator.js";
import { PostThreadDataDriver } from "./classes/PostThreadDataDriver.js";

// TEST DATA
import postsJSON from "../test/posts.json" assert { type: 'json' };
import threadJSON from "../test/threads.json" assert { type: 'json' };
import aboutJSON from "../test/about.json" assert { type: 'json' };

class ProfilePage {

    constructor() {
        this.navBarSectionDividerImplementation();
        this.initializeFeedGenerator();
        this.showThreadButton();

    }

    navBarSectionDividerImplementation() {
        const links     = document.querySelectorAll('.nav-item a'),
              ABOUT_DIV = "about", 
              HOME_DIV  = "posts",
              CARD_DIVS = ["posts", "about"];

        let nbsd = new NavBarSectionDivider(links, CARD_DIVS);

        nbsd.defaultViewProfilePage();

        document.getElementById("about-button").onclick = function() {
            nbsd.changeDiv(ABOUT_DIV);
        }
        document.getElementById("home-button").onclick = function() {
            nbsd.changeDiv(HOME_DIV);
        }
    }

    initializeFeedGenerator() {
        let feedGenerator = new FeedGenerator();

        // TEST DATA
        // POST + THREAD
        let all = postsJSON.concat(threadJSON);

        feedGenerator.initializeSideNavBar();
        // feedGenerator.generatePost(postsJSON);
        // feedGenerator.generateThread(threadJSON);
        feedGenerator.generateDefaultPostThread(all)
        feedGenerator.generateAbout(aboutJSON);
        
        new PostThreadDataDriver(feedGenerator.getHasThreadsArray());
    }

}

// DRIVER [PLEASE DO NOT MODFIY]
new ProfilePage();

