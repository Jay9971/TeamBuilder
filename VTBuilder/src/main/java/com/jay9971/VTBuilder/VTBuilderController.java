package com.jay9971.VTBuilder;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import jakarta.annotation.Resource;

@Controller
public class VTBuilderController {
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@RequestMapping(value="/game", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView sendGamePage() {
	    ModelAndView modelAndView = new ModelAndView();
	    modelAndView.setViewName("game_page.html");
	    return modelAndView;
	}
	
	@RequestMapping(value="/staticPage", method = RequestMethod.GET)
	@ResponseBody
	public String redirect() {
		return "redirect:/static";
	}
	
	@GetMapping(value = "/getImages", produces = MediaType.IMAGE_JPEG_VALUE)
	public ModelAndView sendImages() {
		/* over here is rly simple, basically from an sql database provided by 
		spring data jpa, do a random shuffler that sends one image link and puts it 
		in this redirect modelandview*/
	    return new ModelAndView("redirect:" + "https://img2.wallspic.com/previews/7/5/6/4/94657/94657-dog_like_mammal-eye-wildcat-small_to_medium_sized_cats-felidae-x750.jpg");
	}
	
	@RequestMapping(value="/login", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView login() {
	    ModelAndView modelAndView = new ModelAndView();
	    modelAndView.setViewName("text.html");
	    return modelAndView;
	}
	
	@RequestMapping(value="login", method=RequestMethod.POST)
	@ResponseBody
	public String recieveMovement(@RequestParam String data) {
		logger.info(data);
		return "It worked!!!";
		
	}
	
}
