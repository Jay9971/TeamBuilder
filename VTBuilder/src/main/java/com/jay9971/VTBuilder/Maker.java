package com.jay9971.VTBuilder;

public class Maker {
	
	
	public static String serialize(int num) {
		String n = "";
		if (num >= 90) {
			n += "9" + num;
		} else if (num >= 80) {
			n += "8" + num;
		} else if (num >= 70) {
			n += "7" + num;
		} else if (num >= 60) {
			n += "6" + num;
		} else if (num >= 50) {
			n += "5" + num;
		} else if (num >= 40) {
			n += "4" + num;
		} else if (num >= 30) {
			n += "3" + num;
		} else if (num >= 20) {
			n += "2" + num;
		} else if (num >= 10) {
			n += "1" + num;
		} else {
			n += "0" + num;
		}
		return n;
	}
}
