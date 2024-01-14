package ma.ehtp.projet_geoinfo.web;

import lombok.Data;
import ma.ehtp.projet_geoinfo.custom.EmailSenderService;
import ma.ehtp.projet_geoinfo.custom.LoginRequest;
import ma.ehtp.projet_geoinfo.custom.UpdateStatutRequest;
import ma.ehtp.projet_geoinfo.custom.UpdateStatutUser;
import ma.ehtp.projet_geoinfo.entities.Demande;
import ma.ehtp.projet_geoinfo.entities.Role;
import ma.ehtp.projet_geoinfo.entities.Statut;
import ma.ehtp.projet_geoinfo.entities.Utilisateur;
import ma.ehtp.projet_geoinfo.repository.DemandeRepository;
import ma.ehtp.projet_geoinfo.repository.RoleRepository;
import ma.ehtp.projet_geoinfo.repository.StatutRepository;
import ma.ehtp.projet_geoinfo.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = {"http://localhost:19006", "http://localhost:3000"})
public class UtilisateurRestService {
    @Autowired
    private UtilisateurRepository utilisateurrepository;

    @Autowired
    private StatutRepository statutRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private EmailSenderService emailSenderService;
    Utilisateur user;



    @GetMapping("/utilisateurs/{roleId}")

    public List<Utilisateur> getcitoyens(@PathVariable Long roleId){
        Role role = roleRepository.getRoleById(roleId);
        return utilisateurrepository.findUsersByRole(role);
    }



    @GetMapping("findByEmail/{email}")
    public Long findIdUtilisateurbyEmail(@RequestParam String email){

        return utilisateurrepository.findByEmail(email).getId();




    }

    @GetMapping("findById/{id}")
    public Utilisateur findIdUtilisateurbyId(@RequestParam Long id){

        return utilisateurrepository.findById(id).orElse(null);




    }

    @PostMapping("utilisateurs")
    @Transactional
    public void addUtilisateur(@RequestBody Utilisateur utilisateur){
        if(utilisateur !=null){
            utilisateur.setStatut(new Statut(3L,"En cours de traitement"));
            utilisateurrepository.save(utilisateur);
            emailSenderService.sendEmail(utilisateur.getEmail(),"Confirmation de votre compte", "Pour confirmer votre compte, veuillez cliquer sur le lien suivant: http://192.168.137.88:8085/confirmAccount/"+utilisateur.getId());

        }


    }

    @PostMapping("admins")
    @Transactional
    public void addAdmin(@RequestBody Utilisateur utilisateur){
        if(utilisateur !=null){
            utilisateur.setRole(new Role(1L,"Admin"));
            utilisateur.setStatut(new Statut(8L,"Activé"));
            utilisateurrepository.save(utilisateur);
            emailSenderService.sendEmail(utilisateur.getEmail(),"Confirmation de votre compte", "Nous vous confirmons la création de votre compte Admin pour la plateforme E-Demandes : \n Mot de passe: "+utilisateur.getPassword());

        }


    }

    @GetMapping("/utilisateurs")

    public List<Utilisateur> getUtilisateurs(){
        return utilisateurrepository.findAll();
    }



    @PostMapping("utilisateurs/updateStatut")
    @Transactional
    public Utilisateur updateStatut(@RequestBody UpdateStatutUser request) {
       Utilisateur utilisateur = utilisateurrepository.findById(request.getId_user()).orElse(null);

        Statut statut = statutRepository.findById(request.getId_statut()).orElse(null);
        if(request.getMotif()==null){
            request.setMotif("");
        }

        if (utilisateur != null && statut != null ) {
            utilisateur.setMotif(request.getMotif());
            utilisateur.setStatut(statut);
            return utilisateurrepository.save(utilisateur);
        } else {
            throw new RuntimeException("User or Statut not found");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Utilisateur> login(@RequestBody LoginRequest loginRequest) {
        Utilisateur user =   utilisateurrepository.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            if(user.getStatut().getId()==8L){
                return ResponseEntity.ok(user);
            }
            else {
                // Authentication failed
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            // Authentication successful
            // You can generate a JWT token, set it in the response, etc.


        }
        else {
            // Authentication failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    }



