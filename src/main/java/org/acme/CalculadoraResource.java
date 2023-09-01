package org.acme;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.xml.transform.Templates;

@Path("/calculadora")
public class CalculadoraResource {

    @Inject
    Templates page;

   @GET
   @Path("/somar")
   public String somar(@QueryParam("num1") int num1, @QueryParam("num2") int num2) {
       int resultado = num1 + num2;
       return String.valueOf(resultado);
   }

   @GET
   @Path("subtrair")
   public String subtrair(@QueryParam("num1") int num1, @QueryParam("num2") int num2) {
       int resultado = num1 - num2;
       return String.valueOf(resultado);
   }
   
   @GET
   @Path("/multiplicar")
   public String multiplicar(@QueryParam("num1") int num1, @QueryParam("num2") int num2) {
       int resultado = num1 * num2;
       return String.valueOf(resultado);
   }
   
   @GET
   @Path("/dividir")
   public String dividir(@QueryParam("num1") int num1, @QueryParam("num2") int num2) {
       if (num2 != 0) {
           double resultado = (double) num1 / num2;
           return String.valueOf(resultado);
       } else {
           return "Erro: Divisão por zero";
       }
   }
}