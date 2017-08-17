<template>
    <div class="error_c" :class="modal.show?active:''">
        <div class="popup">
            <div class="popupbehair">
                <img :src="behair.icon?apiurl.api+behair.icon:apiurl.api+'/uploads/behavior/12c@3x.png'" alt="">
            </div>
            <div class="popupfont">
                <p>{{behair.name}}</p>
            </div>
            <div class="popupname">
                <p>给 {{item.name_class}} - {{behair.score}}分</p>
            </div>
        </div>
    </div>
</template>
<script>
     export default {
        props: ['modal','item','behair'],
        data(){
            return {
                active:'active',
                apiurl:api
                
            }
        }
     }
</script>
<style>
    .error_c{
        display: none;
        position: fixed;
        top: 51px;
        left: 1px;
        right: 1px;
        bottom:1px;
        background: rgba(0,0,0,0.3);
        z-index: 10000;


    }
    .active{
        display: block;
    }
    .error_c .popup {
        position: relative;
        width: 650px;
        height: 650px;
        margin: 1% auto;
        background: url("../assets/cha.png") 100px center no-repeat;
    }
    .error_c .popup .popupbehair {
        position: absolute;
        left: 235px;
        top: 245px;
        width: 150px;
        height: 150px;
    }
    .error_c .popup .popupbehair img {
        height: 100%;
        width: 100%;
    }
    .error_c .popupfont {
        font-size: 24px;
        position: absolute;
        bottom: 198px;
        left: 190px;
        color: rgb(255, 255, 255);
        width: 250px;
        height: 50px;
        line-height: 50px;
    }
    .error_c .popupfont p {
        text-align: center;
    }
    .error_c .popupname {
        font-size: 24px;
        position: absolute;
        bottom: 50px;
        left: 180px;
        color: rgb(255, 255, 255);
        min-width: 250px;
        height: 50px;
        line-height: 50px;
        animation-fill-mode: both;
        animation-duration: 0.3s;
        box-shadow: rgba(0, 0, 0, 0.298039) 1px 1px 50px;
        border-radius: 30px;
        background: rgb(153, 153, 153);
    }
    .error_c .popupname p {
        text-align: center;
    }
</style>