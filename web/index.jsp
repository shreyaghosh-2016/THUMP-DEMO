<%-- 
    Document   : index
    Created on : Feb 25, 2016, 11:44:48 AM
    Author     : SIT 1
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8" />
        <!--<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />-->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="stylesheet" href="./Styles/W3.css">
        <link rel="stylesheet" href="./Styles/MyCSS.css">
        <script type="text/javascript" src="./JS/MyJS.js"></script>
        <script type="text/javascript" src="./JS/toastr.js"></script>
        
        
        <title>Thump - Visualization Framework</title>
        <link type="text/css" rel="stylesheet" media="print" href="css1.css" />
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=drawing"></script>
        
        <script type="text/javascript">
        
            function toast(){
                //toastr["error"]("My name is Inigo Montoya. You killed my father. Prepare to die!");
                //alert("a");
                toastr["error"]("Are you the six fingered man?")

                toastr.options = {
                  "closeButton": false,
                  "debug": false,
                  "newestOnTop": false,
                  "progressBar": false,
                  "positionClass": "toast-top-center",
                  "preventDuplicates": false,
                  "onclick": null,
                  "showDuration": "300",
                  "hideDuration": "1000",
                  "timeOut": "5000",
                  "extendedTimeOut": "1000",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut"
                };
            }
        </script>
   
        
        
    </head>
   
    <body onload="indexPageMap();">
	
    <br>
         
    <header class="w3-container w3-teal w3-text-shadow" id="header">
        <div style="float: right; margin-top: 15px; padding-right: 0px;" >
            <a href="./">
                <img src="./Resources/home.png"  alt="Go to Home" width="56" height="56" border="0">
            </a>
        </div>  
        <div style="float: left; margin-top: 08px;" >
        <h4><b>
                    <a href="./" style="text-decoration: none;">
                        <!--THUMP (Traces of HUman Movement Patterns) Visualization -->
                        <!--Traces of Human Movement Pattern Analysis-->
                        <!--CLAP: Clustering and Analyzing People Movements using GPS Traces-->
                        Thump: Semantic Analysis on Trajectory Traces to Explore Human Movement Patterns
                    </a>
            </b></h4>
        </div>
        
        <div style="float: right; position: absolute; top : 5px; margin-left: 72%;">
            <h5><b>
                    Geospatial Research Lab
                    <br/>
                    <a href="http://www.iitkgp.ac.in" target="_blank" style="text-decoration: none; text-align: justify; font-size: small;">
                        Indian Institute of Technology Kharagpur, India 
                    </a>
            </b></h5>
            
        </div>
    </header> 
    
    
      
    
    <div class="w3-card-12" id="dvMap">
    </div>
              
    <div id="cpane">
        <center>
        <!--<select class="w3-input w3-border" onchange="toggleDisability(this);" id="mySelect1">
                <option selected> Select Options </option>
                <option>Find User Category</option>
                <option>Who Are You?</option>
                <option>Find Movement Pattern Within Bounding Box</option>
        </select>-->
        </center>
        <div class="w3-input w3-teal" style="text-align: center; ">
            THUMP Features
        </div>
        <div class="w3-card-12" style="text-align: justify; padding: 6px; ">
            <input type="radio" name="clap_features" id="1" value="1" onclick="toggleRadioBtns();">&nbsp;<label for="1">User Category? </label><button id="info1" style="float: right; width: 22px; height: 25px; padding: 0px;" onclick="ShowInfoForType1();">!</button><br><br>
            <input type="radio" name="clap_features" id="2" value="2" onclick="toggleRadioBtns();">&nbsp;<label for="2">Identify Unknown User </label><button id="info2" style="float: right; width: 22px; height: 25px; padding: 0px;" onclick="ShowInfoForType2();">!</button><br><br>
            <input type="radio" name="clap_features" id="3" value="3" onclick="toggleRadioBtns();">&nbsp;<label for="3">Movement Patterns </label> <button id="info3" style="float: right; width: 22px; height: 25px; padding: 0px;" onclick="ShowInfoForType3();">!</button> <br/>&nbsp;&nbsp;&nbsp;&nbsp;<label for="3">within Bounding Box</label> 
        </div>
        <br/><br/>
        <div class="w3-card-12" id="div1" >
            <div class="w3-input w3-teal" style="text-align: center; ">
            User Category ?
            </div>
            <form action="category.jsp" id="form1" method="post" name="form1" onsubmit="return validateForm(this);">
            <table>
                <tr><td> 
                    <fieldset><legend></legend>
                    <table >

                <tr>
                    <td>

                    <input type="text" id="txt_user_no" name="txt_user_no" placeholder="USER #" required class="w3-input w3-border">

                    </td>
                </tr>
                
                 <br/>
                <tr>
                    <td>

                      <input type="checkbox" name="Bike" id="Bike"> Transfer Knowledge-Base<br>
 
                    </td>
                </tr>
                <!--<tr>
                    <td>
                      <input type="number" id="txt_day_no" name="txt_day_no" placeholder="DAY #" required class="w3-input w3-border">
                    </td>
                </tr>-->
                <tr>
                    <td>
                <center>
                    <br/>
                    <input class="w3-btn-block w3-teal w3-text-shadow" style="width: 250px; height:50px;" name="btn_category" type="submit" value="Show Category & Trajectory" />
                </center>
                    </td>
                </tr>
                </table>
                    </fieldset></td></tr></table>
            </form>
        </div>

        <div class="w3-card-12" id="div2">
            <div class="w3-input w3-teal" style="text-align: center; ">
            Who Are You ?
            </div>
            <form action="NewServlet" id="form2" method="post" name="form2" onsubmit="return validateForm(this);">
            <table>

                <tr><td>
                        <fieldset style="width: 260px;"><legend></legend>
                    <table>

                
                <tr>
                    <td>Latitude<br/>
                        <input type="text" id="txt_user_marker_lat" placeholder="Latitude" disabled class="w3-input w3-border" >
                    </td>
                </tr>  
                
                <tr>
                    <td>Longitude<br/>
                        <input type="text" id="txt_user_marker_lng" placeholder="Longitude" disabled class="w3-input w3-border" >
                    </td>
                </tr>  
                
                <tr>
                    <td><center>
                        <select class="w3-input w3-border" id="drpdwn_user_place_type">
                                <option selected>Select Place Type</option>
                                <option>Academic</option>
                                <option>Housing Complex</option>
                                <option>Student Hall</option>
                                <option>Parking</option>
                                <option>University</option>
                                <option>Food</option>
                                <option>Student's Hangout Spot</option>
                                <option>Others</option>
                        </select>
                    </center>
                    </td>
                </tr>
                
                
                
                <tr>
                    <td><center>
                      <!--<button type="button" onclick="myFunction1()">Compute SScore</button>-->
                      <br/>
                      <input type="button" class="w3-btn-block w3-teal w3-text-shadow" id="btn_draw_markers" onclick="startDrawingMarkers();" value="Draw Pattern"/>
                    </td>
                </tr>
                
                
                <tr>
                    <td><center><br/>
                     <input type="button" class="w3-btn-block w3-teal w3-text-shadow" id="btn_save_userGivenMarkersToArray" onclick="SaveUserGivenMarkersToArray();" value="Save Pattern"/>
                    </td>
                </tr>
                
                
                
                <tr>
                    <td><center>
                        <!--<button type="button" >Show Summarized T_SEG</button>-->
                        <br/>
                        <input type="button" class="w3-btn-block  w3-teal w3-text-shadow" name="btn_seeYourCategory" value="View Category" onclick="seeYourCategory();"  />
                    </center>
                    </td>
                </tr>
                </table>
                    </fieldset></td></tr></table>
            </form>
        </div>

        <div class="w3-card-12" id="div3">
            <!--<form  id="form3"  name="form3" >-->
            
            <div class="w3-input w3-teal" style="text-align: center; font-size: small;">
            Movement Patterns within Bounding Box
            </div>
            <table>

                <tr><td>
                    <fieldset><legend></legend>
                    <table>

               
                
                
                <tr>
                    <td>North<br/>
                        <input type="text" id="txt_north" placeholder="North" disabled class="w3-input w3-border" >
                    </td>
                </tr>                
                
                <tr>
                    <td>South <br/>
                        <input type="text" id="txt_south" placeholder="South" disabled class="w3-input w3-border">
                    </td>
                </tr>
                
                <tr>
                    <td>East<br/>
                        <input type="text" id="txt_east" placeholder="East" disabled class="w3-input w3-border" >
                    </td>
                </tr>
                
                
                <tr>
                    <td>West<br/>
                        <input type="text" id="txt_west" placeholder="West" disabled class="w3-input w3-border">
                    </td>
                </tr>
                
                <tr>
                    <td><center>
                        <br/>
                        <button class="w3-btn-block w3-teal w3-text-shadow" id="btn_draw" onclick="startDrawingBBOX();">Draw Bounding Box</button>
                    </center>
                    </td>
                </tr>
                <tr>
                    <td><br/>
                        <button class="w3-btn-block w3-teal w3-text-shadow" id="btn_ShowSummarizedTrajectory" onclick="ShowSummarizedTrajectory();">Show Summarized Trajectory</button>
                    </td>
                </tr>
                
                
                </table>
                    </fieldset></td></tr></table>
            <!--</form>-->
        </div>
<div id="divd1">
         <div class="w3-input w3-teal"  style="text-align: center; ">
            DATA SET 
         </div>
        
         <div class="w3-card-12"  style="text-align: justify; padding: 6px; ">
            <input type="radio" name="clap_features" id="11" value="11" onclick="toggleRadioBtns1();">&nbsp;<label for="11">BEIJING </label><button id="info1" style="float: right; width: 22px; height: 25px; padding: 0px;" onclick="ShowInfoForType11();">!</button><br><br>
            <input type="radio" name="clap_features" id="21" value="21" onclick="toggleRadioBtns1();">&nbsp;<label for="21">KHARAGPUR</label><button id="info2" style="float: right; width: 22px; height: 25px; padding: 0px;" onclick="ShowInfoForType21();">!</button><br><br>
            <!--input type="radio" name="clap_features" id="3" value="3" onclick="toggleRadioBtns();">&nbsp;<label for="3">Movement Patterns </label> <button id="info3" style="float: right; width: 22px; height: 25px; padding: 0px;" onclick="ShowInfoForType3();">!</button> <br/>&nbsp;&nbsp;&nbsp;&nbsp;<label for="3">within Bounding Box</label--> 
             <!--form action=""-->
              
              <!--/form--> 
          
            
        </div>
        </div> 
        </br> </br>
        
        <div class="w3-input w3-teal" id="div4-header" style="text-align: center; ">
            About THUMP
        </div>
       
        <div class="w3-card-12" id="div4" style="margin-bottom: 20px; padding:10px;">            
            <table>
                <tr>
                    <td>
                       <center><i>
                        <b>THUMP</b> aims at exploring human movement patterns and extracting implicit information from the raw GPS traces
                        </i></center> 
                    </td>
                </tr>
            </table>
            
        </div>
        
        
        
    </div>  
    

</body>


</html>

