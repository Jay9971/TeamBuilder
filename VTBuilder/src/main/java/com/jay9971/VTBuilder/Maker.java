package com.jay9971.VTBuilder;

public class Maker {
	
	
	public static String serialize(int num) {
		String n = "";
		if (num < 10) {
			n += "0" + num;
		} 
		return n;
	}
}
