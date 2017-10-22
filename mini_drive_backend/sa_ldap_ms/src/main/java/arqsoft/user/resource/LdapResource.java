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


@Path( "/ldap" )
public class LdapResource{

    @Context
    UriInfo uriInfo;

    @POST
    public String validate( User user ){
       LdapService login = new LdapService();

       if (login.login(user.getEmail(), user.getPassword())){

        return "{ \"login\": \"True\" } ";

      }else{

        return "{ \"login\": \"False\" } ";

      }

    }


}
