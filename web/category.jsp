<%-- 
    Document   : category
    Created on : Feb 25, 2016, 11:48:05 AM
    Author     : SIT 1
--%>


<%@page import="java.io.FileNotFoundException"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@ page import="com.abhisek.thump.ThumpClass" %>

<jsp:useBean id="link" scope="application" class = "com.abhisek.thump.ThumpClass" />

<%@ page language="java" %>
<%
    String[] stArray={"bob","riche","jacky","rosy"};
    int i=0;
    /*for(i=0;i<stArray.length;i++)
    {
     out.print("stArray Elements       :"+stArray[i]+"<br/>");      
    } */
    
    String user_no=request.getParameter("txt_user_no");
    int flagtransfer=0;
    //if(request.getElementById('Bike').checked) {
   String u=request.getParameter("Bike");
   if(u!=null){
       //out.print("yuppp");
       flagtransfer=1;
   }
   //out.print(user_no);
   //out.print(u);

    //String day_no=request.getParameter("txt_day_no");    
    
    //int category=Category(user_no,day_no);
    ThumpClass t=new ThumpClass();
    //int category=t.detectCategory(user_no, day_no);    
    int category=t.detectCategory(user_no,flagtransfer);  
    String category_text="";
    
    switch(category){
        case 1: category_text="Student"; break;
        case 2: category_text="Professor"; break;
        case 3: category_text="Category 1"; break;
        case 4: category_text="Outsider"; break;
        case 5: category_text="Guest"; break;
        case 6: category_text="Outlier"; break;
        case 7: category_text="No GPS trace Found!"; break;
        case 8: category_text="Category 2"; break;    
        default: category_text="No GPS trace Found!"; break;
    }
    
    List<String> JSPmarkers=new ArrayList();
    int j=0;
    String jspPath = session.getServletContext().getRealPath("/User-Day/");
    //String txtFilePath = jspPath+ "/file.txt";
    String txtFilePath = jspPath+ "/"+user_no+".txt";
    try{
        BufferedReader reader = new BufferedReader(new FileReader(txtFilePath));
        String line;

        while((line = reader.readLine())!= null){
            //sb.append(line+"\n");
            JSPmarkers.add(line.toString());                                
        }  
    }
    catch(FileNotFoundException e){
        out.println("User Not Exist");        
    }
    
    //StringBuilder sb = new StringBuilder();
      
            
%>
<html>
<head>
<title>Category</title>
<link rel="stylesheet" href="./Styles/W3.css">
<link rel="stylesheet" href="./Styles/MyCSS.css">
<script type="text/javascript" src="./JS/MyJS.js"></script>
<script type="text/javascript" src="./JS/toastr.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=drawing"></script>

<script type=text/javascript>
           //alert("shreya");
           //alert(transferbase);
            var markers=new Array();
            //var trajectory_day_jspPage=<%--<%= day_no %>--%>;
            <% 
                for(int k=0; k<JSPmarkers.size(); k++){ %>
                    var one_marker='<%= JSPmarkers.get(k) %>';           
                    markers[<%= k %>]=one_marker;
                    markers.push(one_marker);
                    //alert(markers[<%--<%= k %>--%>]);
                   
                <%
            }
                
                
                %>
            //var objMap = {"JObject" : markers1};
            //markers=JSON.stringify(objMap);
            //alert("json:-"+markers);
        </script>
</head>


<body onload="init();">
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
                        THUMP: Semantic Analysis on Trajectory Traces to Explore Human Movement Patterns
                        
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
    
    
    
    
   <%
            

            
     
    %>
    
    <div class="w3-card-12" id="dvMap">
    </div>
    
    
     <div id="rightpanel">
        <center>
     
        <div class="w3-card-12" >
            <div class="w3-input w3-teal" style="text-align: center; ">
            User Category
            </div>
            
            <table>
                <tr><td> 
                    <fieldset><legend></legend>
                    <table>

                <tr>
                    <td>
                        User # : <b>  <%out.println(user_no);%>   </b>
                    </td>
                </tr>
                <tr>
                    <!--<td>
                      Day # : <%--<%out.println(day_no);%>  --%>
                    </td>-->
                </tr>
                <tr>
                    <td><br/>
                        Category : <b><%out.println(category_text);%></b>
                    </td>
                </tr>
                </table>
                    </fieldset></td></tr></table>
            
        </div>

       
        </center>
    </div>  
</body>
</html>
