from user.matchmaking import compute_plaintext_similarity
from user.user_profile import UserProfile
from user.matchmaking import compute_similarity
from user.matchmaking import find_matches

from datetime import datetime

def generate_test_user_profiles():
    user_profiles = [
        UserProfile(
            user_id=1,
            name="Alice Smith",
            email="alice.smith@example.com",
            phone="1111111111",
            birthday="1986-05-15",
            gender="Female",
            bio="Loves hiking and outdoor adventures.",
            interests=["hiking", "nutrition", "photography"],
            community_role="member",
            profile_picture="http://example.com/alice.jpg",
            location="San Francisco",
            associates=[{"id": 3, "connection_type": "colleague"}]
        ),
        UserProfile(
            user_id=2,
            name="Bob Johnson",
            email="bob.johnson@example.com",
            phone="2222222222",
            birthday="1992-08-22",
            gender="Male",
            bio="Avid reader and tech enthusiast.",
            interests=["reading", "technology"],
            community_role="member",
            profile_picture="http://example.com/bob.jpg",
            location="New York",
            associates=[{"id": 4, "connection_type": "friend"}]
        ),
        UserProfile(
            user_id=3,
            name="Charlie Brown",
            email="charlie.brown@example.com",
            phone="3333333333",
            birthday="1978-12-01",
            gender="Male",
            bio="Enjoys cooking and trying new recipes.",
            interests=["cooking", "traveling"],
            community_role="moderator",
            profile_picture="http://example.com/charlie.jpg",
            location="Chicago",
            associates=[{"id": 5, "connection_type": "family"}]
        ),
        UserProfile(
            user_id=4,
            name="Diana Prince",
            email="diana.prince@example.com",
            phone="4444444444",
            birthday="1989-03-10",
            gender="Female",
            bio="Fitness enthusiast, outdoor adventures, and personal trainer.",
            interests=["hiking,", "fitness", "nutrition", "photography"],
            community_role="member",
            profile_picture="http://example.com/diana.jpg",
            location="San Francisco",
            associates=[{"id": 6, "connection_type": "client"}]
        ),
        UserProfile(
            user_id=5,
            name="Eve Adams",
            email="eve.adams@example.com",
            phone="5555555555",
            birthday="1995-07-25",
            gender="Female",
            bio="Passionate about music and arts.",
            interests=["music", "arts"],
            community_role="member",
            profile_picture="http://example.com/eve.jpg",
            location="Austin",
            associates=[{"id": 7, "connection_type": "partner"}]
        )
    ]
    return user_profiles

def test_compute_plaintext_similarity():

    # Test case 1: Same text
    text1 = "Hello, world!"
    text2 = "Hello, world!"
    score = compute_plaintext_similarity(text1, text2)
    assert score == 1.0

    # Test case 2: Different text
    text1 = "Hello, world!"
    text2 = "Goodbye; moon?"
    score = compute_plaintext_similarity(text1, text2)
    assert score < 0.5

    # Test case 3: Similar text
    text1 = "Hello, world!"
    text2 = "Hello, everyone!"
    score = compute_plaintext_similarity(text1, text2)
    assert score > 0.5

    # Test case 4: Empty text
    text1 = ""
    text2 = "Hello, world!"
    score = compute_plaintext_similarity(text1, text2)
    assert score == 0.5

def test_compute_similarity():
    users = generate_test_user_profiles()

    # Test case 1: Same user
    score = compute_similarity(users[0], users[0])
    assert score == 1.0

    # Test case 2: Different users with different attributes
    score = compute_similarity(users[0], users[1])
    assert 0 <= score <= 1

    # Test case 3: Users with same gender and location
    score = compute_similarity(users[0], users[3])
    assert score > 0.5

    # Test case 4: Users with different community roles
    score = compute_similarity(users[0], users[2])
    assert score < 0.5

    # Test case 5: Users with common associates
    score = compute_similarity(users[0], users[4])
    assert score > 0.5

    # Test case 6: Users with different interests
    score = compute_similarity(users[1], users[2])
    assert score < 0.5

    # Test case 7: Users with similar bios
    score = compute_similarity(users[0], users[4])
    assert score > 0.5

def test_find_matches():
    users = generate_test_user_profiles()

    # Test case 1: Find top 2 matches for user 1 (Alice Smith)
    matches = find_matches(users[0], users, k=2)
    assert len(matches) == 2
    assert matches[0][0].user_id == 4  # Diana Prince
    assert matches[1][0].user_id == 5  # Eve Adams

    # Test case 2: Find top 3 matches for user 2 (Bob Johnson)
    matches = find_matches(users[1], users, k=3)
    assert len(matches) == 3
    assert matches[0][0].user_id == 5  # Eve Adams
    assert matches[1][0].user_id == 4  # Charlie Brown
    assert matches[2][0].user_id == 1  # Alice Smith

    # Test case 3: Find top 2 matches for user 3 (Charlie Brown)
    matches = find_matches(users[2], users, k=2)
    assert len(matches) == 2
    assert matches[0][0].user_id == 2  # Bob Johnson
    assert matches[1][0].user_id == 1  # Alice Smith

    # Test case 4: Find top 2 matches for user 4 (Diana Prince)
    matches = find_matches(users[3], users, k=2)
    assert len(matches) == 2
    assert matches[0][0].user_id == 1  # Alice Smith
    assert matches[1][0].user_id == 5 # Eve Adams

    # Test case 5: Find top 2 matches for user 5 (Eve Adams)
    matches = find_matches(users[4], users, k=2)
    assert len(matches) == 2
    assert matches[0][0].user_id == 4 # Diana Prince
    assert matches[1][0].user_id == 1 # Alice Smith
    