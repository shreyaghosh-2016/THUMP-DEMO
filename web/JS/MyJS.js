/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */    
    var map;
    var mapOptions;
    var cenx='22.3144456';//iit kgp
    var ceny='87.3099609';//iit kgp
    var drawingManager = new google.maps.drawing.DrawingManager();
    var path = new google.maps.MVCArray();
    var path1 = new google.maps.MVCArray();
    var service,service1;
    var infoWindow;
    var poly,poly1;
    var marker ;
    var mapWhere=1;
    var whichmap=1;//google
    var lat_lng1=new Array();//to store user given markers
    var place_type1=new Array();//to store user given markers' place_type
    var transferbase=0;
        
      
    function init() {           //call in the category.jsp page
           
          mapWhere=1;
      
            var len1=markers.length/2;
            //alert(markers.length);
                 if(len1%2===0){
                  len1=len1;
                //  alert("even");
                  }
                  else{
                  len1=len1+0.5;
                
                  }
                  //alert(len1);
                  if(len1===0){
                    mapOptions = {
                        
                        center: new google.maps.LatLng(cenx, ceny), 
                        zoom: 17,
                        geodesic: false,
                        mapTypeId:'satellite'
                       
                    };
                    
                  }
                  else{
                     
                      var word=new Array();
                      word=markers[len1].split(",");
                      var m=0;
                      for (m=0;m<word.length;m++) {
                          //alert(word[m]);
                            if(word[m].startsWith("\"lat")){
                                //cenx=word[m];
                                cenx=word[m].substr(word[m].indexOf("lat")+6);
                                cenx = cenx.substring(0, cenx.length - 1);
                                //alert("cenx- "+cenx);
                            }
                            else if(word[m].startsWith("\"lon")){
                                //ceny=word[m];
                                ceny=word[m].substr(word[m].indexOf("lon")+6);
                                ceny = ceny.substring(0, ceny.length - 1);
                                //alert("ceny- "+ceny);
                            }
                      }
                                                                 
                    mapOptions = {
                        center: new google.maps.LatLng(cenx,ceny ),
                        zoom: 17,
                        geodesic: false,
                        mapTypeId:'satellite'
                        //change shreya
                        //mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                      
                  }
        path = new google.maps.MVCArray();
        service = new google.maps.DirectionsService();
        infoWindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        //chnge!
        poly = new google.maps.Polyline({ map: map, strokeColor: 'red',strokeWeight: 4 });

        var lat_lng = new Array();
        
        for (i = 0; i < markers.length; i++) {
               //var data = markers[i];
               
               var lat="";
               var lon="";
               var title="";
               var place_info="";
               var place_type="";
               
               place_type=markers[i].substring(markers[i].indexOf("[")+1,markers[i].indexOf("]"));      
               
               var trajectory_day="";
               
               var word=new Array();
               
               markers[i]=markers[i].substr(1);     //eliminating the starting brace"{"
               markers[i]=markers[i].substring(0,markers[i].length-1);   //eliminating the ending brace"}"
               //alert(markers[i]);
               
               word=markers[i].split(",");
                var m=0;
                for (m=0;m<word.length;m++) {
                      //alert(word[m]);
                      
                      if(word[m].startsWith("\"lat")){
                          //cenx=word[m];
                          lat=word[m].substr(word[m].indexOf("lat")+6);
                          lat = lat.substring(0, lat.length - 1);
                         // alert(lat);
                      }
                      
                      else if(word[m].startsWith("\"lon")){
                          //ceny=word[m];
                          lon=word[m].substr(word[m].indexOf("lon")+6);
                          lon = lon.substring(0, lon.length - 1);
                         // alert(lon);
                      }

                      else if(word[m].startsWith("\"place_info")){
                          //ceny=word[m];
                          place_info=word[m].substr(word[m].indexOf("place_info")+13);
                          place_info = place_info.substring(0, place_info.length - 1);
                         // alert(place_info);                          
                      }
                      
                      else if(word[m].startsWith("\"trajectory_day")){
                          //ceny=word[m];
                          trajectory_day=word[m].substr(word[m].indexOf("trajectory_day")+17);
                          trajectory_day = trajectory_day.substring(0, trajectory_day.length - 1);
                          //alert(trajectory_day);
                      }
           }
           
           //var myLatlng = new google.maps.LatLng(data.lat, data.lon);
                    //alert("lat"+lat+"-lon"+lon);
                    var myLatlng = new google.maps.LatLng(lat, lon);
                    lat_lng.push(myLatlng);
                    
                    marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        geodesic: false,
                        //title: data.title
                        title: title
                    });
                    (function (marker, place_type) {
                        google.maps.event.addListener(marker, "click", function (e) {
                            //alert("in");
                            //infoWindow.setContent(data.place_info);
                            infoWindow.setContent(place_type);
                            infoWindow.open(map, marker);
                        });
                    })(marker, place_type);



                }      
                
                
                
        
                    for (var i = 0; i < lat_lng.length; i++) {
                        if ((i + 1) < lat_lng.length) {
                            var src = lat_lng[i];
                            var des = lat_lng[i + 1];
                            //alert("src: "+src+"-des: "+des);
                         //  path.push(src);
                            poly.setPath(path);
                            service.route({
                                origin: src,
                                destination: des,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            }, function (result, status) {
                               //alert("xxsrc: "+src+"-xxdes: "+des);
                                if (status === google.maps.DirectionsStatus.OK) {
                                    //  alert(result.routes[0].overview_path.length);
                                    for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {

                                        path.push(result.routes[0].overview_path[i]);
                                    }
                                }
                            });
                        }
                    }
                     
                //}
           
           
           
       }
       
    function indexPageMap() {
        //alert(console.log(indexPageMap));
        //alert("hello");
        var latplace,lngplace; 
        //alert(mapWhere);
        if(mapWhere==1){
               latplace='39.8379162';
               lngplace='116.2765666';
           }
           else{
               latplace='22.3144456';
               lngplace='87.3099609';
           }
           //alert("hi hello");
           //alert(latplace,lngplace);
        var mapOptions = {

            //center: new google.maps.LatLng('22.3144456', '87.3099609'),  //iit kgp
            //center: new google.maps.LatLng('39.8379162', '116.2765666'), //Beijing
           
            
            center: new google.maps.LatLng(latplace,lngplace), //Req University
            //center: new google.maps.LatLng(cenx, ceny), 
            zoom: 17,
            geodesic: false,
            mapTypeId:'satellite'
            //change shreya
            //mapTypeId: google.maps.MapTypeId.ROADMAP
        };                    
                  
        path = new google.maps.MVCArray();

        service = new google.maps.DirectionsService();

        infoWindow = new google.maps.InfoWindow();
           
        map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        //chnge!
        poly = new google.maps.Polyline({ map: map, strokeColor: 'red',strokeWeight: 4 });

        //lat_lng = new Array();
        
        
       }
      


       
    function indexPageMapForBBOX() {
         //alert("chking")  ;
         //alert(mapWhere);
         var latplace,lngplace; 
        //alert(mapWhere);
        if(mapWhere==1){
               latplace='40.008474';
               lngplace='116.324839';
           }
           else{
               latplace='22.3144456';
               lngplace='87.3099609';
           }
          

 

        var mapOptions = {
            center: new google.maps.LatLng(latplace,lngplace), // center for map in div of BBox option
            zoom: 15,
            geodesic: false,
             mapTypeId:'satellite'
            //mapTypeId: google.maps.MapTypeId.ROADMAP
        };                    
                  
        path = new google.maps.MVCArray();
        service = new google.maps.DirectionsService();
        infoWindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        //chnge!
        poly = new google.maps.Polyline({ map: map, strokeColor: 'blue',strokeWeight: 4 });
        
       }
         
    function test(){
        //("func test");
        
        document.getElementById('btn_draw').onclick=drawUserGivenTrajectory();
        document.getElementById('btn_draw').id="btn_drawUserGivenTrajectory";
        
    }
    
    function startDrawingMarkers() {
        alert("Plot Markers on Map one by one");
        
        document.getElementById('btn_draw_markers').value="View Trajectory";
        document.getElementById('btn_draw_markers').onclick = drawUserGivenTrajectory;
                
        //Setting options for the Drawing Tool. In our case, enabling Polygon shape.
        var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            //google.maps.drawing.OverlayType.CIRCLE,
            //google.maps.drawing.OverlayType.POLYGON,
            //google.maps.drawing.OverlayType.POLYLINE,
            //google.maps.drawing.OverlayType.RECTANGLE
          ]
        },
        //markerOptions: {icon: './Resources/beachflag.ico'},
        
      });
      
      drawingManager.setMap(map);
      
        
    lat_lng1=new Array();
    place_type1=new Array();

    google.maps.event.addListener(drawingManager, 'markercomplete', function (marker) {
            //alert("in");
            var objLatLng = marker.getPosition().toString().replace("(", "").replace(")", "").split(',');
            var Lat="";
            Lat= objLatLng[0].toString();
            Lat=Lat.trim();
            var Lng="";
            Lng= objLatLng[1].toString();
            Lng=Lng.trim();

            document.getElementById('txt_user_marker_lat').value=Lat;
            document.getElementById('txt_user_marker_lng').value=Lng;
            //alert(Lat+"-marker drag-"+Lng);
            //var myLatlng1 = new google.maps.LatLng(Lat, Lng);                
            //lat_lng1.push(myLatlng1);
            //alert("-lat_lng1-"+lat_lng1[0]);

    marker.setOptions({
        draggable: false
    });            
    /*google.maps.event.addListener(marker, 'dragend', function () {  //when marker draggable is set True
        // Put your code here when marker finish event drangend Example get LatLang 

            var objLatLng = marker.getPosition().toString().replace("(", "").replace(")", "").split(',');
            Lat = objLatLng[0];
            //Lat = Lat.toString().replace(/(\.\d{1,5})\d*$/, "$1");// Set 5 Digits after comma
            Lng = objLatLng[1];
            //Lng = Lng.toString().replace(/(\.\d{1,5})\d*$/, "$1");// Set 5 Digits after comma

            alert(Lat+"-marker drag-"+Lng);


        });*/
    });
        
        
        
    }
    
    function SaveUserGivenMarkersToArray(){
        //alert("SaveUserGivenMarkersToArray");
        //lat_lng1=new Array();
        //place_type1=new Array();
        var Lat=document.getElementById('txt_user_marker_lat').value;
        var Lng=document.getElementById('txt_user_marker_lng').value;
        
        if(Lat==="" || Lng===""){
            alert("Please Click on \"Plot Markers\" Button At First");
        }
        else{
            
            var drpdown_place_type = document.getElementById("drpdwn_user_place_type");
            var selectedValue = drpdown_place_type.options[drpdown_place_type.selectedIndex].text;

            if(selectedValue==="Select Place Type"){
                alert("Please Select Place Type");
            }
            else{
                //alert(selectedValue);
                var myLatlng1 = new google.maps.LatLng(Lat, Lng);                
                lat_lng1.push(myLatlng1);
                place_type1.push(selectedValue);
                //alert("Saved");
                alert("Saved ! \nLatLng : "+lat_lng1+"\nPlace Type : "+place_type1+"\n\n* Click on Map to plot a new marker\n* Click on View Trajectory Button to view the trajectory");
                document.getElementById('txt_user_marker_lat').value="";
                document.getElementById('txt_user_marker_lng').value="";
                
            }
        }        
        
    }

    function drawUserGivenTrajectory(){
            //alert("drawUserGivenTrajectory: lat_lng1.length- "+lat_lng1.length);
            if(lat_lng1.length>1){
                for (var i = 0; i < lat_lng1.length; i++) {
                //alert("q");
                if ((i + 1) < lat_lng1.length) {
                    var src = lat_lng1[i];
                    var des = lat_lng1[i + 1];
                    //alert("src: "+src+"-des: "+des);
                 //  path.push(src);
                    poly.setPath(path);
                    service.route({
                        origin: src,
                        destination: des,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    }, function (result, status) {
                        //alert("xxsrc: "+src+"-xxdes: "+des);
                        if (status === google.maps.DirectionsStatus.OK) {
                                                 //alert(result.routes[0].overview_path.length);
                            for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                                path.push(result.routes[0].overview_path[i]);
                            }
                        }
                    });
                }
            }
                
                
                document.getElementById('btn_draw_markers').value="Clear";
                document.getElementById('btn_draw_markers').onclick = clearUserGivenTrajectory;
                //document.getElementById('btn_seeYourCategory').style.visibility = 'visible'; 
            
            }
            else{
                alert("Please Plot Atleast Two Markers !");
            }
        }
        
    function seeYourCategory(){
        //alert(lat_lng1);
       // alert(place_type1);
        var acad=0;
        var estab=0;
        var park=0;
        var hall=0;
        var uni=0;
        var food=0;
        var student=0;
        var others=0;
        
        
        var total=lat_lng1.length;
        var stotal=0;
        var ptotal=0;
        //write the code here!
        for (var i = 0; i < place_type1.length; i++) {
            if(place_type1[i]==='Academic'){
               // alert("academic");
                acad++;
            }
            
            if(place_type1[i]==='Housing Complex'){
               // alert("estab");
                estab++;
            }
            if(place_type1[i]==='Student Hall'){
               // alert("hall");
                hall++;
            }
            if(place_type1[i]==='Parking'){
               // alert("parking");
                park++;
            }
            if(place_type1[i]==='University'){
               // alert("uni");
                uni++;
            }
            if(place_type1[i]==='Food'){
              //  alert("food");
                food++;
            }
            if(place_type1[i]==='Student\'s Hangout Spot'){
               // alert("student");
                student++;
            }
            if(place_type1[i]==='Others'){
                others++;
            }
           
        }
        stotal=(acad+hall+food+uni+student);
        ptotal=(acad+estab+park+uni);
        total=total;
        var minsto=stotal*0.1;
        var minptot=ptotal*0.1;
        //alert(stotal);
        //alert(ptotal);
        if(stotal>ptotal){
        var w=((stotal-minsto)/total)*100;
        alert("Your Category is : Student\n\n TNTG Score : "+w+"%");
    }
        else if(stotal<ptotal){
        var w=((stotal-minptot)/total)*100;
        alert("Your Category is : Professor\n\n TNTG Score : "+w+"%");
    }
       else{
           alert("Unknown Category!\n\n TNTG Score : 0%");
           //alert(stotal+ptotal+total);
       }
    
    }
            
    function clearUserGivenTrajectory(){
            //alert("before-"+lat_lng1.length);
            lat_lng1.length=0;
            place_type1.length=0;
            //alert("before!!");
            //alert("after-"+lat_lng1.length);
            indexPageMap();
            
            document.getElementById('btn_draw_markers').value="Plot Markers";
            document.getElementById('btn_draw_markers').onclick = startDrawingMarkers;
            
            //document.getElementById('txt_ne').value="";
            //document.getElementById('txt_sw').value="";
            
        }
        
    function startDrawingBBOX() {
        //alert("q");
        //var map=document.getElementById('dvMap');
        
        document.getElementById('btn_draw').innerHTML="Clear";
        document.getElementById('btn_draw').onclick = ClearBBOX;
        //alert("hhiihih");
        //Setting options for the Drawing Tool. In our case, enabling Polygon shape.
        var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            //google.maps.drawing.OverlayType.MARKER,
            //google.maps.drawing.OverlayType.CIRCLE,
            //google.maps.drawing.OverlayType.POLYGON,
            //google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE
          ]
        },
        //markerOptions: {icon: './Resources/beachflag.ico'},
        rectangleOptions: {

            editable: true,
            draggable: true,
            strokeColor: 'teal'
            //clickable: false
            //zIndex: 1

        }
      });
      //alert("shree");
      drawingManager.setMap(map);
      //alert("shreya");
        //document.getElementById('txt_north').value=drawingManager.getBounds().getNorthEast();
        //document.getElementById('txt_south').value=event.overlay.getBounds().getSouthWest();

        google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(rectangle) {
                    //alert("qq shree");
                    var north="";
                    north=rectangle.getBounds().getNorthEast().toString();
                    north=north.substring(1,north.indexOf(","));
                    var south="";
                    south=rectangle.getBounds().getSouthWest().toString();
                    south=south.substring(1,south.indexOf(","));
                    var east="";
                    east=rectangle.getBounds().getNorthEast().toString();
                    east=east.substr(east.indexOf(",")+2);
                    east=east.substr(0,east.length-2);
                    var west="";
                    west=rectangle.getBounds().getSouthWest().toString();
                    west=west.substr(west.indexOf(",")+2);
                    west=west.substr(0,west.length-2);
                    
                    //alert(ne+"\n"+sw);

                    document.getElementById('txt_north').value=north.toString();
                    document.getElementById('txt_south').value=south.toString();
                    document.getElementById('txt_east').value=east.toString();
                    document.getElementById('txt_west').value=west.toString();
            drawingManager.setDrawingMode(null);
            
            
            google.maps.event.addListener(rectangle, 'bounds_changed', function() {
                    //console.log(rectangle);
                    //alert("qq");
                    var north="";
                    north=rectangle.getBounds().getNorthEast().toString();
                    north=north.substring(1,north.indexOf(","));
                    var south="";
                    south=rectangle.getBounds().getSouthWest().toString();
                    south=south.substring(1,south.indexOf(","));
                    var east="";
                    east=rectangle.getBounds().getNorthEast().toString();
                    east=east.substr(east.indexOf(",")+2);
                    east=east.substr(0,east.length-2);
                    var west="";
                    west=rectangle.getBounds().getSouthWest().toString();
                    west=west.substr(west.indexOf(",")+2);
                    west=west.substr(0,west.length-2);
                    
                    //alert(ne+"\n"+sw);

                    document.getElementById('txt_north').value=north.toString();
                    document.getElementById('txt_south').value=south.toString();
                    document.getElementById('txt_east').value=east.toString();
                    document.getElementById('txt_west').value=west.toString();
            });
           
        });
        
        //alert("hi dona");
        google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection );
        //alert("jjijijij");
        google.maps.event.addListener(map, 'click', clearSelection);
        //alert("dona");
        }
        
    function ClearBBOX(){
        indexPageMapForBBOX();
        document.getElementById('btn_draw').innerHTML="Draw Bounding Box";
        document.getElementById('btn_draw').onclick = startDrawingBBOX;
        document.getElementById('btn_ShowSummarizedTrajectory').disabled=false;
        
        document.getElementById('txt_north').value="";
        document.getElementById('txt_south').value="";
        document.getElementById('txt_east').value="";
        document.getElementById('txt_west').value="";
    }
    
    function ShowSummarizedTrajectory(){
        //alert("Under Construction !");
        //indexPageMapForBBOX();
        var nelat1=document.getElementById('txt_north').value;   // north
        var swlat1=document.getElementById('txt_south').value;	//south
        var nelon1=document.getElementById('txt_east').value;	//east
        var swlon1=document.getElementById('txt_west').value;	//west

        var nomove=1;
        if(swlat1==="" || swlon1==="" || nelat1==="" || nelon1===""){
            alert("Draw Bounding Box At First");
        }
        
        else{
            
            var swlat=parseFloat(swlat1);
            var swlon=parseFloat(swlon1);
            var nelat=parseFloat(nelat1);
            var nelon=parseFloat(nelon1);
            //alert(swlat+"-"+swlon+"-"+nelat+"-"+nelon);


         //  alert(mapWhere) ;
           if(mapWhere===1){ //beijing
            //student traj 
            var lat1=40.009086,lon1=116.326021;
            var lat2=40.008383,lon2=116.326406;
            var lat3=40.008207,lon3=116.324190;
            var lat4=40.007566,lon4=116.324984;
            var lat5=40.007352,lon5=116.326540;
            var lat6=40.007073,lon6=116.323804;
            var lat7=40.007718,lon7=116.327650;
            var lat8=40.009086,lon8=116.326021;


            //prof traj
            var lat9=40.010010,lon9=116.323150;
            var lat10=40.008424,lon10=116.322146;
            var lat11=40.009094,lon11=116.323949;
            var lat12= 40.006935,lon12=116.323552;
            var lat13=40.006881,lon13=116.321264;
            var lat14=40.006114,lon14=116.319712;
            var lat15=40.009030,lon15=116.322951;
             
             var profLat=new Array();
             var profPlace=new Array();
             var i=0;
             var j=0;
             var k=0;
             var l=0;

             var stuLat=new Array();
             var stuPlace=new Array();
             
             
             if(swlat<lat1 && swlon<lon1 && lat1<nelat && lon1<nelon){
                var Lat=parseFloat(lat1);
                var Lng=parseFloat(lon1);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Studten's Apartment");
                //alert(stuLat[0]+","+stuLat[1]+","+stuPlace[0]);

            }

            //student2

            if(swlat<lat2 && swlon<lon2 && lat2<nelat && lon2<nelon){
              

                var Lat=parseFloat(lat2);
                var Lng=parseFloat(lon2);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Studten's Apartment");

            }
            //student 3

            if(swlat<lat3 && swlon<lon3 && lat3<nelat && lon3<nelon){
               
                var Lat=parseFloat(lat3);
                var Lng=parseFloat(lon3);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University No. 20 Building");

            }
            //student 4
            if(swlat<lat4 && swlon<lon4 && lat4<nelat && lon4<nelon){
              
                var Lat=parseFloat(lat4);
                var Lng=parseFloat(lon4);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua university Building 116");

            }
            //student 5
            if(swlat<lat5 && swlon<lon5 && lat5<nelat && lon5<nelon){
              
                var Lat=parseFloat(lat5);
                var Lng=parseFloat(lon5);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Student's Apartment");

            }

            //student 6
            if(swlat<lat6 && swlon<lon6 && lat6<nelat && lon6<nelon){
              
                var Lat=parseFloat(lat6);
                var Lng=parseFloat(lon6);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Digital Culture & Sports Shop");


            }
            //student 7
            if(swlat<lat7 && swlon<lon7 && lat7<nelat && lon7<nelon){
             
                var Lat=parseFloat(lat7);
                var Lng=parseFloat(lon7);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Building 16");

            }
            //student 8
            if(swlat<lat8 && swlon<lon8 && lat8<nelat && lon8<nelon){
               
                var Lat=parseFloat(lat8);
                var Lng=parseFloat(lon8);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Studten's Apartment");

            }
            ////////////////
            //prof1
            if(swlat<lat9 && swlon<lon9 && lat9<nelat && lon9<nelon){
              
                var Lat=parseFloat(lat9);
                var Lng=parseFloat(lon9);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Tsinghua University 23 Dormitory");

            }
            //prof 2
            if(swlat<lat10 && swlon<lon10 && lat10<nelat && lon10<nelon){
              
                var Lat=parseFloat(lat10);
                var Lng=parseFloat(lon10);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Tsinghua University National");

            }
            //prof 3
             if(swlat<lat11 && swlon<lon11 && lat11<nelat && lon11<nelon){
               
                var Lat=parseFloat(lat11);
                var Lng=parseFloat(lon11);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Tsinghua University Building No. 29");

            }
             //prof 4
              if(swlat<lat12 && swlon<lon12 && lat12<nelat && lon12<nelon){
              
                var Lat=parseFloat(lat12);
                var Lng=parseFloat(lon12);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Bank Of Beijing");

            }
              //prof 5
               if(swlat<lat13 && swlon<lon13 && lat13<nelat && lon13<nelon){
               
                var Lat=parseFloat(lat13);
                var Lng=parseFloat(lon13);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Qing Qing Times Cafe");

            }
             //prof 6 
             if(swlat<lat14 && swlon<lon14 && lat14<nelat && lon14<nelon){
              
                var Lat=parseFloat(lat14);
                var Lng=parseFloat(lon14);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Department Of chemistry Tsinghua University");

            } 
             //prof 7
             if(swlat<lat15 && swlon<lon15 && lat15<nelat && lon15<nelon){
               
                var Lat=parseFloat(lat15);
                var Lng=parseFloat(lon15);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Tsinghua University 21 Dormitory");

            } 

            else{
                //System.out.println("NOO");
            } 
             
             //--------------------------------------------------
             //Ploting the markers from arrays of student 
             //--------------------------------------------------

             if(stuLat.length>1){
                    nomove=0;
                    for (var i = 0; i < stuLat.length; i++) {
                        //alert("q");
                        if ((i + 1) < stuLat.length) {
                            var src = stuLat[i];
                            var des = stuLat[i + 1];
                            //alert("s"+src);
                            //alert("s"+des);
                            path = new google.maps.MVCArray();
                            service = new google.maps.DirectionsService();

                            poly = new google.maps.Polyline({ map: map, strokeColor: 'blue',strokeWeight: 4 });
                            
                            poly.setPath(path);
                           // infoWindow.open(poly,"hilloo");
                            service.route({
                                origin: src,
                                destination: des,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            }, function (result, status) {
                                //alert("xxsrc: "+src+"-xxdes: "+des);
                                if (status === google.maps.DirectionsStatus.OK) {
                                                         
                                    for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                                        path.push(result.routes[0].overview_path[i]);
                                    }
                                }
                            });
                        }
                    }   

                    alert("BLUE polyline represents signature movement pattern of Student category in th egiven bounding box");
                 
                }
                else{
                    if(nomove===1)
                    alert("No prevalent categorical movement pattern of STUDENT present here!");
                    nomove=0;
                }
                //alert("student traj complete");
                //--------------------------------------------------
                //Ploting the markers from arrays of Profs
                //--------------------------------------------------

                if(profLat.length>1){
                    nomove=0;
                    
                    for (var i = 0; i < profLat.length; i++) {
                        //alert("q");
                        if ((i + 1) < profLat.length) {
                            var src = profLat[i];
                            //alert("p"+src);
                            var des = profLat[i + 1];
                            //alert("p"+des);
                            poly1 = new google.maps.Polyline({ map: map, strokeColor: 'red',strokeWeight: 4});
                            path1=new google.maps.MVCArray();
                            service1 = new google.maps.DirectionsService();

                            poly1.setPath(path1);
                            service1.route({
                                origin: src,
                                destination: des,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            }, function (result1, status1) {
                                //alert("xxsrc: "+src+"-xxdes: "+des);
                                if (status1 === google.maps.DirectionsStatus.OK) {
                                    //alert(result.routes[0].overview_path.length);
                                    for (var i = 0, len = result1.routes[0].overview_path.length; i < len; i++) {
                                        path1.push(result1.routes[0].overview_path[i]);
                                    }
                                }
                            });
                        }
                    }
                    alert("RED polyline represents signature movement pattern of 'Professor' category in th egiven bounding box");
                 
                }
                else{
                    if(nomove===1)
                    alert("No prevalent categorical movement pattern of PROFESSOR present here!");
                }



             document.getElementById('btn_ShowSummarizedTrajectory').disabled=true;
        }        
         
        else if(mapWhere===2){ //kgp
            //student traj 
            var lat1=22.3094846,lon1=87.3108285;
            var lat2=22.309511,lon2=87.309803;
            var lat3=22.317273,lon3=87.312056;
            var lat4=22.317194,lon4=87.312054;
            var lat5=22.319292,lon5=87.305843;
            var lat6=22.317228,lon6=87.312056;
            var lat7=22.317248,lon7=87.312150;
            var lat8=22.3094846,lon8=87.3108285;

            
             var lats1=22.316749,lons1=87.295322;
            var lats2=22.316974,lons2=87.295099;
            var lats3=22.317273,lons3=87.312056;
            var lats4=22.317208,lons4=87.312099;
            var lats5=22.316749,lons5=87.295322;
            var lats6=22.316593,lons6=87.312252;
            var lats7=22.317248,lons7=87.312150;
            var lats8=22.316749,lons8=87.295322;
            
            
            //prof traj
            var lat9=22.3141128,lon9=87.3087022;
            var lat10=22.317208,lon10=87.312023;
            var lat11=22.316682,lon11=87.311143;
            var lat12= 22.317296,lon12=87.312245;
            var lat13=22.31764,lon13=87.309093;
            var lat14=22.317431,lon14=87.313695;
            var lat15=22.3141128,lon15=87.3087022;
             
             var profLat=new Array();
             var profPlace=new Array();
             var i=0;
             var j=0;
             var k=0;
             var l=0;

             var stuLat=new Array();
             var stuPlace=new Array();
             
             if(swlat<lat1 && swlon<lon1 && lat1<nelat && lon1<nelon){
                var Lat=parseFloat(lat1);
                var Lng=parseFloat(lon1);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Studten's Apartment");
                //alert(stuLat[0]+","+stuLat[1]+","+stuPlace[0]);

            }

            //student2

            if(swlat<lat2 && swlon<lon2 && lat2<nelat && lon2<nelon){
              

                var Lat=parseFloat(lat2);
                var Lng=parseFloat(lon2);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Studten's Apartment");

            }
            //student 3

            if(swlat<lat3 && swlon<lon3 && lat3<nelat && lon3<nelon){
               
                var Lat=parseFloat(lat3);
                var Lng=parseFloat(lon3);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University No. 20 Building");

            }
            //student 4
            if(swlat<lat4 && swlon<lon4 && lat4<nelat && lon4<nelon){
              
                var Lat=parseFloat(lat4);
                var Lng=parseFloat(lon4);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua university Building 116");

            }
            //student 5
            if(swlat<lat5 && swlon<lon5 && lat5<nelat && lon5<nelon){
              
                var Lat=parseFloat(lat5);
                var Lng=parseFloat(lon5);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Student's Apartment");

            }

            //student 6
            if(swlat<lat6 && swlon<lon6 && lat6<nelat && lon6<nelon){
              
                var Lat=parseFloat(lat6);
                var Lng=parseFloat(lon6);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Digital Culture & Sports Shop");


            }
            //student 7
            if(swlat<lat7 && swlon<lon7 && lat7<nelat && lon7<nelon){
             
                var Lat=parseFloat(lat7);
                var Lng=parseFloat(lon7);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Building 16");

            }
            //student 8
            if(swlat<lat8 && swlon<lon8 && lat8<nelat && lon8<nelon){
               
                var Lat=parseFloat(lat8);
                var Lng=parseFloat(lon8);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Studten's Apartment");

            }
            
            
            ///new entry
            //
            //
         if(swlat<lats1 && swlon<lons1 && lats1<nelat && lons1<nelon){
                var Lat=parseFloat(lats1);
                var Lng=parseFloat(lons1);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Studten's Apartment");
                //alert(stuLat[0]+","+stuLat[1]+","+stuPlace[0]);

            }

            //student2

            if(swlat<lats2 && swlon<lons2 && lats2<nelat && lons2<nelon){
              

                var Lat=parseFloat(lats2);
                var Lng=parseFloat(lons2);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Studten's Apartment");

            }
            //student 3

            if(swlat<lats3 && swlon<lons3 && lats3<nelat && lons3<nelon){
               
                var Lat=parseFloat(lats3);
                var Lng=parseFloat(lons3);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University No. 20 Building");

            }
            //student 4
            if(swlat<lats4 && swlon<lons4 && lats4<nelat && lons4<nelon){
              
                var Lat=parseFloat(lats4);
                var Lng=parseFloat(lons4);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua university Building 116");

            }
            //student 5
            if(swlat<lats5 && swlon<lons5 && lats5<nelat && lons5<nelon){
              
                var Lat=parseFloat(lats5);
                var Lng=parseFloat(lons5);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Student's Apartment");

            }

            //student 6
            if(swlat<lats6 && swlon<lons6 && lats6<nelat && lons6<nelon){
              
                var Lat=parseFloat(lats6);
                var Lng=parseFloat(lons6);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Digital Culture & Sports Shop");


            }
            //student 7
            if(swlat<lats7 && swlon<lons7 && lats7<nelat && lons7<nelon){
             
                var Lat=parseFloat(lats7);
                var Lng=parseFloat(lons7);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Building 16");

            }
            //student 8
            if(swlat<lats8 && swlon<lons8 && lats8<nelat && lons8<nelon){
               
                var Lat=parseFloat(lats8);
                var Lng=parseFloat(lons8);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                stuLat.push(myLatlng);
                stuPlace.push("Tsinghua University Studten's Apartment");

            }
            ////////////////
            //prof1
            if(swlat<lat9 && swlon<lon9 && lat9<nelat && lon9<nelon){
              
                var Lat=parseFloat(lat9);
                var Lng=parseFloat(lon9);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Tsinghua University 23 Dormitory");

            }
            //prof 2
            if(swlat<lat10 && swlon<lon10 && lat10<nelat && lon10<nelon){
              
                var Lat=parseFloat(lat10);
                var Lng=parseFloat(lon10);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Tsinghua University National");

            }
            //prof 3
             if(swlat<lat11 && swlon<lon11 && lat11<nelat && lon11<nelon){
               
                var Lat=parseFloat(lat11);
                var Lng=parseFloat(lon11);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Tsinghua University Building No. 29");

            }
             //prof 4
              if(swlat<lat12 && swlon<lon12 && lat12<nelat && lon12<nelon){
              
                var Lat=parseFloat(lat12);
                var Lng=parseFloat(lon12);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Bank Of Beijing");

            }
              //prof 5
               if(swlat<lat13 && swlon<lon13 && lat13<nelat && lon13<nelon){
               
                var Lat=parseFloat(lat13);
                var Lng=parseFloat(lon13);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Qing Qing Times Cafe");

            }
             //prof 6 
             if(swlat<lat14 && swlon<lon14 && lat14<nelat && lon14<nelon){
              
                var Lat=parseFloat(lat14);
                var Lng=parseFloat(lon14);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Department Of chemistry Tsinghua University");

            } 
             //prof 7
             if(swlat<lat15 && swlon<lon15 && lat15<nelat && lon15<nelon){
               
                var Lat=parseFloat(lat15);
                var Lng=parseFloat(lon15);
                var myLatlng = new google.maps.LatLng(Lat, Lng);                
                profLat.push(myLatlng);
                profPlace.push("Tsinghua University 21 Dormitory");

            } 

            else{
                //System.out.println("NOO");
            } 
             
             //--------------------------------------------------
             //Ploting the markers from arrays of student 
             //--------------------------------------------------

             if(stuLat.length>1){
                    nomove=0;
                    for (var i = 0; i < stuLat.length; i++) {
                        //alert("q");
                        if ((i + 1) < stuLat.length) {
                            var src = stuLat[i];
                            var des = stuLat[i + 1];
                            //alert("s"+src);
                            //alert("s"+des);
                            path = new google.maps.MVCArray();
                            service = new google.maps.DirectionsService();

                            poly = new google.maps.Polyline({ map: map, strokeColor: 'blue',strokeWeight: 4 });
                            
                            poly.setPath(path);
                           // infoWindow.open(poly,"hilloo");
                            service.route({
                                origin: src,
                                destination: des,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            }, function (result, status) {
                                //alert("xxsrc: "+src+"-xxdes: "+des);
                                if (status === google.maps.DirectionsStatus.OK) {
                                                         
                                    for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                                        path.push(result.routes[0].overview_path[i]);
                                    }
                                }
                            });
                        }
                    }   

                    alert("BLUE polyline represents signature movement pattern of Student category in th egiven bounding box");
                 
                }
                else{
                    if(nomove===1)
                    alert("No prevalent categorical movement pattern of STUDENT present here!");
                    nomove=0;
                }
                //alert("student traj complete");
                //--------------------------------------------------
                //Ploting the markers from arrays of Profs
                //--------------------------------------------------

                if(profLat.length>1){
                    nomove=0;
                    
                    for (var i = 0; i < profLat.length; i++) {
                        //alert("q");
                        if ((i + 1) < profLat.length) {
                            var src = profLat[i];
                            //alert("p"+src);
                            var des = profLat[i + 1];
                            //alert("p"+des);
                            poly1 = new google.maps.Polyline({ map: map, strokeColor: 'red',strokeWeight: 4});
                            path1=new google.maps.MVCArray();
                            service1 = new google.maps.DirectionsService();

                            poly1.setPath(path1);
                            service1.route({
                                origin: src,
                                destination: des,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            }, function (result1, status1) {
                                //alert("xxsrc: "+src+"-xxdes: "+des);
                                if (status1 === google.maps.DirectionsStatus.OK) {
                                    //alert(result.routes[0].overview_path.length);
                                    for (var i = 0, len = result1.routes[0].overview_path.length; i < len; i++) {
                                        path1.push(result1.routes[0].overview_path[i]);
                                    }
                                }
                            });
                        }
                    }
                    alert("RED polyline represents signature movement pattern of 'Professor' category in th egiven bounding box");
                 
                }
                else{
                    if(nomove===1)
                    alert("No prevalent categorical movement pattern of PROFESSOR present here!");
                }



             document.getElementById('btn_ShowSummarizedTrajectory').disabled=true;
        }
    
         
             else{
                 alert("No ROI selected! Please select Beijing/Kharagpur region");
                 return;
             }
             //student1
            
         
    }
}
  ///////////////////////////////////////////////////////////////////////////////////////////////////  
        
    function toggleDisability(selectElement){
   //Getting all select elements
   var arraySelects = document.getElementsByClassName('mySelect');
      //Getting selected index
   var selectedOption = selectElement.selectedIndex;
   //Disabling options at same index in other select elements
  
 //alert(selectedOption);
  if(selectedOption===1){
      //alert(selectedOption);
      //indexPageMap();
      var div1=document.getElementById('div1');
      div1.style.visibility = 'visible'; 
      var div2=document.getElementById('div2');
      div2.style.visibility = 'hidden'; 
      var div3=document.getElementById('div3');
      div3.style.visibility = 'hidden'; 
     
      var divdata=document.getElementById('divd1');
      divdata.style.visibility = 'hidden';
  }
  else if(selectedOption===2){
      indexPageMap();
      var div1=document.getElementById('div1');
      div1.style.visibility = 'hidden'; 
      var div2=document.getElementById('div2');
      div2.style.visibility = 'visible'; 
      var div3=document.getElementById('div3');
      div3.style.visibility = 'hidden';  
      
      var divdata=document.getElementById('divd1');
      divdata.style.visibility = 'hidden';
  }
  else if(selectedOption===3){
      //alert("jiji");
      //indexPageMap();
      indexPageMapForBBOX();
      var div1=document.getElementById('div1');
      div1.style.visibility = 'hidden'; 
      var div2=document.getElementById('div2');
      div2.style.visibility = 'hidden'; 
      var div3=document.getElementById('div3');
      div3.style.visibility = 'visible';   
      
      var divdata=document.getElementById('divd1');
      divdata.style.visibility = 'hidden';
  }
  else if(selectedOption===0){
      var div1=document.getElementById('div1');
      div1.style.visibility = 'hidden'; 
      var div2=document.getElementById('div2');
      div2.style.visibility = 'hidden'; 
      var div3=document.getElementById('div3');
      div3.style.visibility = 'hidden';  
      
      var divdata=document.getElementById('divd1');
      divdata.style.visibility = 'hidden';
  }
  // for(var i=0; i<arraySelects.length; i++) {
  //  if(arraySelects[i] == selectElement)
   //  continue; //Passing the selected Select Element

  //  arraySelects[i].options[selectedOption].disabled = true;
  // }
  }
  function checkthis(){
     // alert("here");
      if(transferbase===0)
          transferbase=1;
      else
          transferbase=0;
  }
  
  function toggleRadioBtns(){
      if (document.getElementById('1').checked) {
       // alert("a");
        indexPageMap();
        var div1=document.getElementById('div1');
        div1.style.visibility = 'visible'; 
        var div2=document.getElementById('div2');
        div2.style.visibility = 'hidden'; 
        var div3=document.getElementById('div3');
        div3.style.visibility = 'hidden';
        var div4header=document.getElementById('div4-header');
        div4header.style.visibility = 'hidden';
        var div4=document.getElementById('div4');
        div4.style.visibility = 'hidden';
        
        var divdata=document.getElementById('divd1');
        divdata.style.visibility = 'hidden';
      
      }
      if (document.getElementById('2').checked) {
        //alert("b");
        indexPageMap();
        var div1=document.getElementById('div1');
        div1.style.visibility = 'hidden'; 
        var div2=document.getElementById('div2');
        div2.style.visibility = 'visible'; 
        var div3=document.getElementById('div3');
        div3.style.visibility = 'hidden';  
        var div4header=document.getElementById('div4-header');
        div4header.style.visibility = 'hidden';
        var div4=document.getElementById('div4');
        div4.style.visibility = 'hidden';
        
        var divdata=document.getElementById('divd1');
        divdata.style.visibility = 'hidden';
      }
      if (document.getElementById('3').checked) {
        //alert("c");
        indexPageMapForBBOX();
        var div1=document.getElementById('div1');
        div1.style.visibility = 'hidden'; 
        var div2=document.getElementById('div2');
        div2.style.visibility = 'hidden'; 
        var div3=document.getElementById('div3');
        div3.style.visibility = 'visible';
        var div4header=document.getElementById('div4-header');
        div4header.style.visibility = 'hidden';
        var div4=document.getElementById('div4');
        div4.style.visibility = 'hidden';
        
        var divdata=document.getElementById('divd1');
        divdata.style.visibility = 'hidden';
      }
      
  }
  
  
  function googlemap_pull(){
      
      alert("google");
      whichmap=1;
      indexPageMap();
  }
  
  function osm_pull(){
     
       alert("osm");
       whichmap=2;
       indexPageMap();
       
  }
  
  
  
  function toggleRadioBtns1(){
      if (document.getElementById('11').checked) {
        //alert("a");
        mapWhere=1; //beijing
        indexPageMap();
        
        
      }
      if (document.getElementById('21').checked) {
        //alert("b");
        mapWhere=2;
        indexPageMap();
       
      }
      
      
  }
  
  function ShowInfoForType1(){
      //alert("a");
      var div1=document.getElementById('div1');
        div1.style.visibility = 'hidden'; 
        var div2=document.getElementById('div2');
        div2.style.visibility = 'hidden'; 
        var div3=document.getElementById('div3');
        div3.style.visibility = 'hidden';
        var div4header=document.getElementById('div4-header');
        div4header.style.visibility = 'visible';
        div4header.innerHTML ="About User Category ?";
        var div4=document.getElementById('div4');
        div4.style.visibility = 'visible';
        div4.innerHTML ="Determines different category of users based on their daily movement patterns";
        
        
        
  }
  
  function ShowInfoForType2(){
      //alert("a");
      var div1=document.getElementById('div1');
        div1.style.visibility = 'hidden'; 
        var div2=document.getElementById('div2');
        div2.style.visibility = 'hidden'; 
        var div3=document.getElementById('div3');
        div3.style.visibility = 'hidden';
        var div4header=document.getElementById('div4-header');
        div4header.style.visibility = 'visible';
        div4header.innerHTML ="About Identify New User";
        var div4=document.getElementById('div4');
        div4.style.visibility = 'visible';
        div4.innerHTML ="Monitors any anomalous movement pattern in a region";
        
  }
  
  
function ShowInfoForType11(){
      //alert("a");
      var div1=document.getElementById('div1');
        div1.style.visibility = 'hidden'; 
        var div2=document.getElementById('div2');
        div2.style.visibility = 'hidden'; 
        var div3=document.getElementById('div3');
        div3.style.visibility = 'hidden';
        var div4header=document.getElementById('div4-header');
        div4header.style.visibility = 'visible';
        div4header.innerHTML ="Data Set Description";
        var div4=document.getElementById('div4');
        div4.style.visibility = 'visible';
        div4.innerHTML ="Microsoft GeoLife Dataset (182 users, over 3 years, around Beijing City)";
        
        
        
  }
  function ShowInfoForType21(){
      //alert("a");
      var div1=document.getElementById('div1');
        div1.style.visibility = 'hidden'; 
        var div2=document.getElementById('div2');
        div2.style.visibility = 'hidden'; 
        var div3=document.getElementById('div3');
        div3.style.visibility = 'hidden';
        var div4header=document.getElementById('div4-header');
        div4header.style.visibility = 'visible';
        div4header.innerHTML ="Data Set Description";
        var div4=document.getElementById('div4');
        div4.style.visibility = 'visible';
        div4.innerHTML ="IIT Kharagpur (18 users (+12 synthetic data), average 3-4 months)";
        
        
        
  }
  


function ShowInfoForType3(){
      //alert("a");
      var div1=document.getElementById('div1');
        div1.style.visibility = 'hidden'; 
        var div2=document.getElementById('div2');
        div2.style.visibility = 'hidden'; 
        var div3=document.getElementById('div3');
        div3.style.visibility = 'hidden';
        var div4header=document.getElementById('div4-header');
        div4header.style.visibility = 'visible';
        div4header.innerHTML ="About Movement Patterns Within Bounding Box";
        var div4=document.getElementById('div4');
        div4.style.visibility = 'visible';
        div4.innerHTML ="Captures prevalent categorical movement patterns in a given bounding box";
        
  }
  
    function category(){
      //alert("hi cat");
      //alert(transferbase);
    $.ajax({
        type: "POST",
        url: "NewServlet.java",
        success: function(data){
            alert(" successful");
        },
        error: function (data){
            alert("sorry  failed");
        }
    });
}

    function validateForm(theform) {
        var reason = "";

        reason += validateName(theform.county);
        reason += validateSurname(theform.surname);
        reason += validateEmail(theform.email);
        reason += validateHomephone(theform.homephone);
        reason += validateMobilephone(theform.mobilephone);
        reason += validateAddress(theform.address);
        reason += validateTown(theform.town);
        reason += validateCounty(theform.county);
        reason += validatePostcode(theform.postcode);
        reason += validateEmpty(theform.empty);


        if (reason != "") {
        alert("Some fields need correction:\n" + reason);
        return false;
        }

        alert("All fields are filled correctly");
        return true;
    }