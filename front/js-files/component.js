function a(user) {
    hDiv.insertAdjastmentHTML('beforeend',`<form>
	<textarea id="msgTxt">${user}</textarea>
	<input id="profileIMG" type="hidden" value="<%=UserFriends.profilePhotos%>">
    <input id="profileNAME" type="hidden" value="<%=UserFriends.name%>">
	<button title="send" onclick="sendMsg(event)"><i class="fa fa-paper-plane"></i></button>
    </form>`) 
    
}