package com.jay9971.VTBuilder.DataSchemas;

public class AudioRequestData {
	private String userid;
	
	private String audioData;
	
	public AudioRequestData() {
		
	}
	
	public AudioRequestData(String userid, String audioData) {
		this.userid = userid;
		this.audioData = audioData;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getAudioData() {
		return audioData;
	}

	public void setAudioData(String audioData) {
		this.audioData = audioData;
	}
	
	
}
