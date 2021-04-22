<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>

        <div v-else class="main">
        <div class="about-section">
            <h5>About</h5>
            <br>
            <pre>
                Task List page will display 100 latest tasks ordered descending by creation time by default, can be sorted by any field.
                Size and priority values are shown on task list and detail page only after task has been in priority voting and voting has finished.
                If task has been included in many votings, last voting results are used for size and priority calculation.
                Old size and priority values are not displayed any more if task is added to new priority voting.

                Administrator can create new priority votings, add tasks and assing users to voting. All parameters can be changed.
                New tasks or users can be added to voting even if voting is already open. Also start and end date can be modified.
                Users can see priority votings assigned to them (with voting status) at Assigned votings page.

                Priorities and task sizes are calculated as all users values average using WSJF method.
                Average is calculated based on users who have voted. If some don't vote, it doesn't affect size and priority values.
                User can change priority values unlimited times during open voting, last one will count.

                After the voting closes, values by users and criteria can be seen from voting (icon appears after voting end time has passed).

                Tasks can be created and edited by all users but deleted only by administrator. All users can add comments to tasks.
                For every update on task there will be changelog displayed when, by who and what was changed.

                Task categories can be created and added by all users but deleted only by administrator.
                On categories page number of all tasks, in progress tasks (in progress or in review) and closed tasks is shown for category.

                Roadmap displays only tasks with start and end time set, ordered descending by task creation time.
                Default limit for displayed tasks is 100, but can be changed. Dates for graph period can also be configured.
                User can move from roadmap to specific task details clicking on task description on graph or on task row.

                Tasks can be searched from search bar based on task title or description field.

                New users can be created and deleted only by administrator.
                Initial password is set by administrator but password change is required for user after first login.
            </pre>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../../store";

@Component
export default class About extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }
}
</script>
