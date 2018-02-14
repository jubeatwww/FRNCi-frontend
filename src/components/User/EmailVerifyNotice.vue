<template>
    <md-layout md-column>
        <h4>Check Your Email!</h4>
        <p>
           We sent you an email to 
           <span style="font-weight:bolder;">{{email}}</span> 
           to verify your email address. 
           <br>
           <br>
           You must click the link we sent to use all the features of GlocalClick.
           <br>
           <br>
           PS. If you can't find it, please look for it in your junk mail folder. 
           <br>
           If you find it there, please add 
           <a href="mailto:contactus@fnrci.com">contactus@frnci.com</a> 
           to your email contacts <br>so that you won't miss anything important.
        </p>
    </md-layout>
</template>

<script>
export default {
    data() {
        return { email: localStorage.getItem('_email') };
    },
};
</script>


<style lang="scss" scoped>

</style>

