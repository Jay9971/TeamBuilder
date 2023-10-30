package com.jay9971.VTBuilder.DataSchemas;

public class SendAnalyticsResponse {
	private String status;
	private String[] key1;
	private int[] val1;
	private String[] key2;
	private int[] val2;
	private String[] key3;
	private int[] val3;
	private String[] key4;
	private int[] val4;
	
	public SendAnalyticsResponse() {
		
	}
	
	public SendAnalyticsResponse(String status) {
		this.status = status;
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String[] getKey1() {
		return key1;
	}
	public void setKey1(String[] key1) {
		this.key1 = key1;
	}
	public int[] getVal1() {
		return val1;
	}
	public void setVal1(int[] val1) {
		this.val1 = val1;
	}
	public String[] getKey2() {
		return key2;
	}
	public void setKey2(String[] key2) {
		this.key2 = key2;
	}
	public int[] getVal2() {
		return val2;
	}
	public void setVal2(int[] val2) {
		this.val2 = val2;
	}
	public String[] getKey3() {
		return key3;
	}
	public void setKey3(String[] key3) {
		this.key3 = key3;
	}
	public int[] getVal3() {
		return val3;
	}
	public void setVal3(int[] val3) {
		this.val3 = val3;
	}
	public String[] getKey4() {
		return key4;
	}
	public void setKey4(String[] key4) {
		this.key4 = key4;
	}
	public int[] getVal4() {
		return val4;
	}
	public void setVal4(int[] val4) {
		this.val4 = val4;
	}
	
	
}
