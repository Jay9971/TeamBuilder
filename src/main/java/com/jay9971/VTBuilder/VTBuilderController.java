package com.jay9971.VTBuilder;


import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.ArrayList;
import org.springframework.core.io.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.jay9971.VTBuilder.Repository.ArchiveRepository;
import com.jay9971.VTBuilder.Repository.Users;
import com.jay9971.VTBuilder.Repository.UsersRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jay9971.VTBuilder.DataSchemas.*;
import com.jay9971.VTBuilder.Repository.Archive;

import org.springframework.core.io.ClassPathResource;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class VTBuilderController {
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	//private ImageManager img = new ImageManager();
	//private String image = img.getPath();
	
	@Autowired
	private ArchiveRepository archiveRepo;
	
	@Autowired
	private UsersRepository usersRepo;
	
	
	/** Redirects to login page from default page **/
	@RequestMapping(value="", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView loginRedirect() {
	    ModelAndView modelAndView = new ModelAndView();
	    modelAndView.setViewName("redirect:/login");
	    return modelAndView;
	}
	
	
	/** Sends game HTML page**/
	@RequestMapping(value="/game", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView sendGamePage() {
	    ModelAndView modelAndView = new ModelAndView();
	    modelAndView.setViewName("gameplay_screen.html");
	    return modelAndView;
	}
	
	
	
	/** Sends other static assets like CSS, JS, etc **/
	@RequestMapping(value="/staticPage", method = RequestMethod.GET)
	@ResponseBody
	public String redirect() {
		return "redirect:/static";
	}
	
	
	
	/** Sends the image to all clients**/
	@RequestMapping(value = "/get-image-from-server48281", method=RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> sendImage(@RequestParam("userid") String data, HttpServletResponse response) throws IOException{
		Users user = usersRepo.findById((long)Integer.parseInt(data)).get();
		String image = archiveRepo.findById(user.getLobby()).get().getImage();
		
        Resource resource = new ClassPathResource(image);
        if (resource.exists()) {
            try (InputStream inputStream = resource.getInputStream()) {
                byte[] bytes = inputStream.readAllBytes();
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(bytes);
            }
        } else {
            // Handle image not found
            return ResponseEntity.notFound().build();
        }
    }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/** Receives the location data and adds it to database archive**/
	@RequestMapping(value = "/send-square-locations-data", method=RequestMethod.POST)
	@ResponseBody
	public void receiveData(@RequestBody String data) {
		try {
			ObjectMapper objMapper = new ObjectMapper();
			SquareRequestData rqData = objMapper.readValue(data, SquareRequestData.class);
			
			Users user = usersRepo.findById((long)Integer.parseInt(rqData.getUserid())).get();
			Archive lobby = archiveRepo.findById(user.getLobby()).get();
			
			lobby.setData(rqData.getOccupiedSquares());
			logger.info("Occupied Squares: " + rqData.getOccupiedSquares());
			archiveRepo.save(lobby);
			
		} catch (Exception e) {
			
		}
	} 
	
	
	/** Sends the location data out to every client (should be always active) **/
	@RequestMapping(value = "/get-square-locations-data", method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> sendData(@RequestBody String data) {
		try {
			ObjectMapper objMapper = new ObjectMapper();
			LobbyRequestData rqData = objMapper.readValue(data, LobbyRequestData.class);
			
			Users user = usersRepo.findById((long)Integer.parseInt(rqData.getUserid())).get();
			Archive lobby = archiveRepo.findById(user.getLobby()).get();
			ArrayList<String> players = new ArrayList<String>();
			for (long u=1; u < usersRepo.count(); u++) {
				Users us = usersRepo.findById(u).get();
				if (us.getLobby() == lobby.getId() && us.getId() != user.getId()) {
					players.add(us.getName());
				} else if (us.getId() == user.getId()) {
					players.add(0, us.getName());
				}
			}
			String player_list = "";
			for (String player : players) {
				player_list += player;
			}
			SquareResponseData dataObj = new SquareResponseData(lobby.getData(), Integer.toString(lobby.getIsStarted()), player_list);
			
		    String jsonData = objMapper.writeValueAsString(dataObj);
		    
		    HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.APPLICATION_JSON);
		    return new ResponseEntity<>(jsonData, headers, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
	
	
	
	
	
	
	@RequestMapping(value = "/get-game-initial-data", method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> gameStarter(@RequestBody String data) {
		try {
			ObjectMapper objMapper = new ObjectMapper();
			LobbyRequestData rqData = objMapper.readValue(data, LobbyRequestData.class);
			
			Users user = usersRepo.findById((long)Integer.parseInt(rqData.getUserid())).get();
			Archive lobby = archiveRepo.findById(user.getLobby()).get();
			
			StartGameResponseData dataObj = new StartGameResponseData();
			
			int total_players = 0;
			for (long userID = 1; userID <= usersRepo.count(); userID++) {
				Users us = usersRepo.findById(userID).get();
				if (us != null && us.getLobby() == lobby.getId()) {
					total_players++;
				}
			}
			

			int squares_left = lobby.getSquares();
			
			String squares = lobby.getData();
			int total_squares = squares.length()/2;
			
			
			ArrayList<String> list_squares = new ArrayList<String>();
			for (int i=0; i < squares.length(); i+=2) {
				list_squares.add(squares.substring(i, i+2));
			}
			
			int count = 0;
			String player_squares = "";
			while (count < (int)(total_squares/total_players)) {
				int rand = (int)(Math.random() * total_squares);
				if (list_squares.get(rand).charAt(1) != 'F') {
					player_squares += list_squares.get(rand);
					count++;
					squares_left--;
					list_squares.set(rand, "FF");
				}
			}
			
			squares = "";
			for (String square : list_squares) {
				squares += square;
			}
			
			
			dataObj.setAssignedSquares(player_squares);
			dataObj.setImageUrl("/get-image-from-server48281");
			dataObj.setNumSquares(Integer.toString(total_squares));
			
			
			if (squares_left == 0) {
				squares = "";
				for (int i=0; i < total_squares; i++) {
					squares += "00";
				}
			}
			
			lobby.setData(squares);
			lobby.setSquares(squares_left);
			
			archiveRepo.save(lobby);
			
			
		    String jsonData = objMapper.writeValueAsString(dataObj);
		    

		    HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.APPLICATION_JSON);
		    return new ResponseEntity<>(jsonData, headers, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
	
	
	
	
	
	@RequestMapping(value = "/leave-game", method=RequestMethod.POST)
	@ResponseBody
	public void leaveGame(@RequestBody String data) {
		try {
			ObjectMapper objMapper = new ObjectMapper();
			LobbyRequestData rqData = objMapper.readValue(data, LobbyRequestData.class);
			
			Users user = usersRepo.findById((long)Integer.parseInt(rqData.getUserid())).get();
			usersRepo.delete(user);
			
			int player_total = 0;
			for (long u=0; u < usersRepo.count(); u++) {
				if (usersRepo.findById(u).get().getLobby() == user.getLobby()) {
					player_total++;
				}
			}
			if (player_total == 0) {
				Archive lobby = archiveRepo.findById(user.getLobby()).get();
				archiveRepo.delete(lobby);
			}
			
			
			
		} catch (Exception e) {

		}
	}
	
	
	
	
	
	
	@RequestMapping(value = "/start-game", method=RequestMethod.POST)
	@ResponseBody
	public void startGame(@RequestBody String data) {
		try {
			
			ObjectMapper objMapper = new ObjectMapper();
			LobbyRequestData rqData = objMapper.readValue(data, LobbyRequestData.class);
			
			Archive lobby = archiveRepo.findById(usersRepo.findById((long)Integer.parseInt(rqData.getUserid())).get().getLobby()).get();
			
			//if server is already started
			if (lobby.getIsStarted() == 1) {
				return;
			}
			
			lobby.setIsStarted(1);
			
			
			ArrayList<Users> players = new ArrayList<Users>();
			for (long userID = 1; userID <= usersRepo.count(); userID++) {
				Users user = usersRepo.findById(userID).get();
				if (user != null && user.getLobby() == lobby.getId()) {
					players.add(user);
				}
			}
			// calculate squares, distribution of players, get image
			int total_players = players.size();
			int total_squares = total_players * total_players;
			
			lobby.setSquares(total_squares);
			
			String squareData = "";
			for (int i=0; i < total_squares; i++) {
				squareData += Maker.serialize(i);
			}
			
			
			lobby.setData(squareData);

			
			ImageManager imgManager = new ImageManager();
			String image = imgManager.getPath();
			
			
			lobby.setImage(image);
			
			for (Users player: players) {
				player.setSquares(squareData);
			}
			
			
			for (Users player: players) {
				usersRepo.save(player);
			}
			
			archiveRepo.save(lobby);
			

		} catch (Exception e) {
			
		}
	}
	
	
	
	
	
	
	
	@RequestMapping(value = "/get-player-list-in-lobby", method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> sendPlayerList(@RequestBody String data) {
		try {
			ObjectMapper objMapper = new ObjectMapper();
			LobbyRequestData rqData = objMapper.readValue(data, LobbyRequestData.class);
			String userid = rqData.getUserid();
			
			Users current_user = usersRepo.findById((long)Integer.parseInt(userid)).get();
			
			ArrayList<String> arr = new ArrayList<String>();
			for (long userID = 1; userID <= usersRepo.count(); userID++) {
				
				Optional<Users> user_wrapper = usersRepo.findById(userID); 
				
				Users user = user_wrapper.get();
				
				
				if (user != null && user.getId() == current_user.getId()) {
					arr.add(0, user.getName());
				} 
				else if (user != null && user.getLobby() == current_user.getLobby()){
					arr.add(user.getName());	
				}
			}	
			
			Archive lobby = archiveRepo.findById(current_user.getLobby()).get();
			String final_list = "";
			for (int i=0; i < arr.size(); i++) {
				final_list += arr.get(i);
			}
			
		
			LobbyResponseData response = new LobbyResponseData();
			response.setUrl("/game");
			response.setIsStarted(Integer.toString(lobby.getIsStarted()));
			response.setUserList(final_list);
			//response.setUrl("/game");
			//response.setIsStarted("0");
			//response.setUserList("userList");
			

		    String jsonData = objMapper.writeValueAsString(response);
		    
		    HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.APPLICATION_JSON);
		    return new ResponseEntity<>(jsonData, headers, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}
	
	
	
	
	
	
	
	@RequestMapping(value="/lobby", method=RequestMethod.GET)
	@ResponseBody
    public ModelAndView lobby(@RequestParam("userid") String userid) {
	    ModelAndView modelAndView = new ModelAndView();
	    modelAndView.setViewName("lobby.html");
        modelAndView.addObject("userid", userid);
	    modelAndView.addObject("lobby", usersRepo.findById((long)Integer.parseInt(userid)).get().getLobby());
	    return modelAndView;
	}
	
	
	

	
	@RequestMapping(value="/login", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView login() {
	    ModelAndView modelAndView = new ModelAndView();
	    modelAndView.setViewName("login.html");
	    return modelAndView;
	}
	
	
	
	/** Login create lobby request mapping **/
	@RequestMapping(value="/create-lobby", method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> createLobby(@RequestBody String data) {
		try {
			
			ObjectMapper objMapper = new ObjectMapper();
			CreateLobbyRequestData rqData = objMapper.readValue(data, CreateLobbyRequestData.class);
			
			//Generate new lobby + code
			long lobbyCode = archiveRepo.count() + 1000;
			archiveRepo.save(new Archive(lobbyCode, "image-url", "", -1, 0));
			
			//Generate new user + userid
			long total_users = usersRepo.count();
			long newID = total_users + 1;
			Users new_user = new Users(newID, rqData.getName(), "", lobbyCode);
			usersRepo.save(new_user);
			
			
			
			//response handling
		    LoginResponseData dataObj = new LoginResponseData();
		    dataObj.setCode(Maker.serialize((int)(newID)));
		    dataObj.setUrl("lobby");
		    dataObj.setLobby(Integer.toString((int)lobbyCode));
		    
		    String jsonData = objMapper.writeValueAsString(dataObj);
		    
		    HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.APPLICATION_JSON);
		    return new ResponseEntity<>(jsonData, headers, HttpStatus.OK);
		    
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
	
	
	/** Login join lobby request mapping **/
	@RequestMapping(value="/send-join-lobby-data", method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> recieveLobbyCode(@RequestBody String data) {
		try {
			ObjectMapper objMapper = new ObjectMapper();
			LoginRequestData rqData = objMapper.readValue(data, LoginRequestData.class);
			
			// sends a fuck off request if the game is active
			if (archiveRepo.findById((long)Integer.parseInt(rqData.getCode())).get().getIsStarted() == 1) {
				LoginResponseData dataObj = new LoginResponseData();
				dataObj.setCode("");
				dataObj.setUrl("Fuck off");
				dataObj.setLobby("");
				String jsonData = objMapper.writeValueAsString(dataObj);
			    HttpHeaders headers = new HttpHeaders();
			    headers.setContentType(MediaType.APPLICATION_JSON);
			    return new ResponseEntity<>(jsonData, headers, HttpStatus.OK);
			}
		
			// calculates new user id based on past users and creates a new user entry in the repo
			long total_users = usersRepo.count();
			long newID = total_users + 1;
			Users new_user = new Users(newID, rqData.getName(), "", (long)Integer.parseInt(rqData.getCode()));
			usersRepo.save(new_user);
			
			
			// response handling
		    LoginResponseData dataObj = new LoginResponseData();
		    dataObj.setCode(Maker.serialize((int)(newID)));
		  
		    dataObj.setUrl("lobby");
		    dataObj.setLobby(rqData.getCode());
		    
		    String jsonData = objMapper.writeValueAsString(dataObj);
		    
		    HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.APPLICATION_JSON);
		    return new ResponseEntity<>(jsonData, headers, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
