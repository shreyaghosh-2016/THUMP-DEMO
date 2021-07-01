/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.abhisek.thump;
//import org.python.util.PythonInterpreter;
import java.util.Properties;
//import org.python.util.PythonInterpreter;

public class ThumpClass {
      public int detectCategory(String user_no, int flagt){
  //     PythonInterpreter interpreter = new PythonInterpreter();
        
        int a=Integer.parseInt(user_no);
        //int b=Integer.parseInt(day_no);
        System.out.println("checking"+a);
        int category=0;
        if((a==1 || a==8) && flagt==0){
            category=3;
        }
        else if(a==1 && flagt==1){
            category=2;
        }
        else if(a==8 && flagt==1){
            category=1;
        }
        else if(a==2 || a==7 ){
            category=2;
        }
         else if(a>2 && a<10 && a!=8){
          category=1;
      }
         else if(a==10 || a==11){
             category=8;
         }
         else if(a==12){
             category=1;
         }
     /* else if(a>=40 && a<60){
          category=2;
      }
      else if(a>=60 && a<80){
          category=3;
      }
      else if(a>=80 && a<100){
          category=4;
      }
      else if(a>=100 && a<150){
          category=5;
      }
      else if(a>=150 && a<=182){
          category=6;
      }
      */
      else if(a>10) category=7;
      return category;
        
    }
}