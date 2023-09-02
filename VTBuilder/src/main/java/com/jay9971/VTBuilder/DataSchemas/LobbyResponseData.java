package com.jay9971.VTBuilder.DataSchemas;

import java.util.Arrays;

public class LobbyResponseData {
	private String[] userList;

	public LobbyResponseData() {
		
	}
	
	public LobbyResponseData(String[] userList) {
		this.userList = userList;
	}
	
	public String[] getUserList() {
		return userList;
	}

	public void setUserList(String[] userList) {
		this.userList = userList;
	}

	@Override
	public String toString() {
		return "LobbyResponseData [userList=" + Arrays.toString(userList) + "]";
	}
	
	
}
