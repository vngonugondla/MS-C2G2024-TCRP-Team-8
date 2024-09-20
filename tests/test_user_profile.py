import pytest
from user.user_profile import UserProfile
from datetime import datetime

def test_user_profile_initialization():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male",
        bio="A short bio",
        interests=["coding", "reading"],
        community_role="member",
        profile_picture="http://example.com/pic.jpg",
        location="New York",
        associates=[{"id": 2, "connection_type": "friend"}]
    )
    
    assert user.user_id == 1
    assert user.name == "John Doe"
    assert user.email == "john.doe@example.com"
    assert user.phone == "1234567890"
    assert user.birthday == datetime.strptime("1990-01-01", '%Y-%m-%d')
    assert user.gender == "Male"
    assert user.bio == "A short bio"
    assert user.interests == ["coding", "reading"]
    assert user.community_role == "member"
    assert user.profile_picture == "http://example.com/pic.jpg"
    assert user.location == "New York"
    assert user.associates == [{"id": 2, "connection_type": "friend"}]
    assert user.approved == False
    assert user.active == False
    assert user.points == 0
    assert isinstance(user.created_at, datetime)

def test_update_user_id():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male"
    )
    user.update_user_id(2)
    assert user.user_id == 2

def test_update_bio():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male"
    )
    user.update_bio("New bio")
    assert user.bio == "New bio"

def test_update_interests():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male"
    )
    user.update_interests(["new interest"])
    assert user.interests == ["new interest"]

def test_update_email():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male"
    )
    user.update_email("new.email@example.com")
    assert user.email == "new.email@example.com"

def test_update_phone():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male"
    )
    user.update_phone("0987654321")
    assert user.phone == "0987654321"

def test_update_profile_picture():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male"
    )
    user.update_profile_picture("http://example.com/new_pic.jpg")
    assert user.profile_picture == "http://example.com/new_pic.jpg"

def test_update_location():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male"
    )
    user.update_location("Los Angeles")
    assert user.location == "Los Angeles"

def test_change_approval():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male"
    )
    user.change_approval()
    assert user.approved == True
    user.change_approval()
    assert user.approved == False

def test_change_active_status():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male"
    )
    user.change_active_status()
    assert user.active == True
    user.change_active_status()
    assert user.active == False

def test_set_points():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male"
    )
    user.set_points(100)
    assert user.points == 100

def test_add_associate():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male"
    )
    user.add_associate(3, "colleague")
    assert {"id": 3, "connection_type": "colleague"} in user.associates

def test_remove_associate():
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male",
        associates=[{"id": 2, "connection_type": "friend"}]
    )
    user.remove_associate(2)
    assert {"id": 2, "connection_type": "friend"} not in user.associates

def test_display_profile_active_user(capsys):
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male",
        bio="A short bio",
        interests=["coding", "reading"],
        community_role="member",
        profile_picture="http://example.com/pic.jpg",
        location="New York",
        associates=[{"id": 2, "connection_type": "friend"}]
    )
    user.active = True
    user.approved = True
    user.display_profile()
    captured = capsys.readouterr()
    assert "User ID: 1" in captured.out
    assert "Name: John Doe" in captured.out
    assert "Bio: A short bio" in captured.out
    assert "Interests: ['coding', 'reading']" in captured.out
    assert "Email: john.doe@example.com" in captured.out
    assert "Phone: 1234567890" in captured.out
    assert "Birthday: 1990-01-01 00:00:00" in captured.out
    assert "Location: New York" in captured.out
    assert "Community Role: member" in captured.out
    assert "Points: 0" in captured.out
    assert "Associates: [{'id': 2, 'connection_type': 'friend'}]" in captured.out
    assert "Approved: True" in captured.out
    assert "Active: True" in captured.out

def test_display_profile_inactive_user(capsys):
    user = UserProfile(
        user_id=1,
        name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        birthday="1990-01-01",
        gender="Male",
        bio="A short bio",
        interests=["coding", "reading"],
        community_role="member",
        profile_picture="http://example.com/pic.jpg",
        location="New York",
        associates=[{"id": 2, "connection_type": "friend"}]
    )

    user.display_profile()
    captured = capsys.readouterr()
    assert "This user is not currently active and approved in the community." in captured.out