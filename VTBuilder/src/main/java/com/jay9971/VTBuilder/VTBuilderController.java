package com.jay9971.VTBuilder;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.jay9971.VTBuilder.Repository.ArchiveRepository;
import com.jay9971.VTBuilder.Repository.Archive;

import jakarta.annotation.Resource;

@Controller
public class VTBuilderController {
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private ImageManager imgManager;
	
	@Autowired
	private ArchiveRepository repository;
	
	
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
	    modelAndView.setViewName("game_page.html");
	    return modelAndView;
	}
	
	/** Sends other static assets like CSS, JS, etc **/
	@RequestMapping(value="/staticPage", method = RequestMethod.GET)
	@ResponseBody
	public String redirect() {
		return "redirect:/static";
	}
	
	/** Sends the image to all clients**/
	@RequestMapping(value = "/getImage", method=RequestMethod.GET)
	public ModelAndView sendImages() {
		/* over here is rly simple, basically from an sql database provided by 
		spring data jpa, do a random shuffler that sends one image link and puts it 
		in this redirect modelandview*/
	    return new ModelAndView("redirect:" + "https://img2.wallspic.com/previews/7/5/6/4/94657/94657-dog_like_mammal-eye-wildcat-small_to_medium_sized_cats-felidae-x750.jpg");
	}
	
	
	/** Receives the location data and adds it to database archive**/
	@RequestMapping(value = "/send-square-locations-data", method=RequestMethod.POST)
	@ResponseBody
	public void receiveData(@RequestParam String data) {
		Optional<Archive> repo_data = repository.findById(1l);
		if (!repo_data.isPresent()) {
			return;
		}
		Archive archive = repo_data.get();
		archive.setData(data);
		
		repository.save(archive);

	} 
	
	
	/** Sends the location data out to every client (should be always active) **/
	@RequestMapping(value = "/get-square-locations-data", method=RequestMethod.GET)
	@ResponseBody
	public String sendData() {
		Optional<Archive> repo_data = repository.findById(1l);
		if (!repo_data.isPresent()) {
			return null;
		}
		Archive archive = repo_data.get();
		
		return archive.getData();
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// LOGIN TESTER BULLSHIT
	
	@RequestMapping(value="/login", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView login() {
	    ModelAndView modelAndView = new ModelAndView();
	    modelAndView.setViewName("text.html");
	    return modelAndView;
	}
	
	@RequestMapping(value="login", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView recieveMovement(@RequestParam String data) {
		logger.info(data);
	    ModelAndView modelAndView = new ModelAndView();
	    modelAndView.setViewName("redirect:/game");
	    return modelAndView;
	}
	
}
