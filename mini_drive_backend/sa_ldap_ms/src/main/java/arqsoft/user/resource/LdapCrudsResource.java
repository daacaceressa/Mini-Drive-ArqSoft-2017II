package arqsoft.user.resource;

import arqsoft.user.model.User;
import arqsoft.user.service.LdapService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.List;


@Path( "/ldapcruds" )
public class LdapCrudsResource{

    @Context
    UriInfo uriInfo;

    //Comentario
    @POST
    public Response create( User user ){
       LdapService login = new LdapService();

       if (login.creation(user.getEmail(), user.getPassword(),user.getName(), user.getNick() )){

        return Response.status( Response.Status.CREATED ).build( );

      }else{

        return Response.status( Response.Status.NO_CONTENT ).build( );

      }

    }

    @DELETE
    @Path( "{id}" )
    public Response deleteUser( @PathParam( "id" ) String id ){
       LdapService login = new LdapService();
       System.out.println("Acaaa");
       if ( login.deleteUsers( id ) ){

        return Response.status( Response.Status.OK ).build( );

      }else{

        return Response.status( Response.Status.NO_CONTENT ).build( );

      }

    }


}
