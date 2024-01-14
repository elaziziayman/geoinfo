package ma.ehtp.projet_geoinfo.web;

import lombok.AllArgsConstructor;
import ma.ehtp.projet_geoinfo.custom.LoginRequest;
import ma.ehtp.projet_geoinfo.entities.Statut;
import ma.ehtp.projet_geoinfo.entities.Utilisateur;
import ma.ehtp.projet_geoinfo.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Controller
@AllArgsConstructor


public class UtilisateurController {

    @Autowired
    UtilisateurRepository utilisateurRepository;


    @GetMapping("confirmAccount/{userId}")
    public String confirmAccount(@PathVariable Long userId){
        Utilisateur user = utilisateurRepository.findById(userId).orElse(null);
        if(user !=null){
            if(user.getStatut().getId()==3L){
                user.setStatut(new Statut(8L,"Activé"));
                utilisateurRepository.save(Objects.requireNonNull(user));
                return "confirmation";

            } else if (user.getStatut().getId()==8L) {
                return "alreadyactivated";

            }
            else{
                return "fail";
            }
        }
        else{
            return "404";


        }
    }


}
