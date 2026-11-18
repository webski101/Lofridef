/// First Ride badges for lofridef.
/// Records which ambassador helped a newcomer complete their first onboarding action.
module lofridef::ambassador_badge {
    use std::string::{Self, String};
    use sui::event;
    use sui::clock::{Self, Clock};

    /// Shared registry that tracks issued badge ids for an ambassador program.
    public struct BadgeRegistry has key {
        id: UID,
        admin: address,
        total_issued: u64,
    }

    /// Soulbound-style receipt held by the newcomer (no store — not freely transferable).
    public struct FirstRideBadge has key {
        id: UID,
        ambassador_code: String,
        first_action: String,
        issued_at_ms: u64,
    }

    public struct BadgeIssued has copy, drop {
        badge_id: ID,
        ambassador_code: String,
        newcomer: address,
        first_action: String,
        issued_at_ms: u64,
    }

    fun init(ctx: &mut TxContext) {
        transfer::share_object(BadgeRegistry {
            id: object::new(ctx),
            admin: tx_context::sender(ctx),
            total_issued: 0,
        });
    }

    /// Issue a First Ride badge to `newcomer`, attributing `ambassador_code`.
    public fun issue_badge(
        registry: &mut BadgeRegistry,
        ambassador_code: vector<u8>,
        first_action: vector<u8>,
        newcomer: address,
        clock: &Clock,
        ctx: &mut TxContext,
    ) {
        assert!(tx_context::sender(ctx) == registry.admin, 0);

        let issued_at_ms = clock::timestamp_ms(clock);
        let badge = FirstRideBadge {
            id: object::new(ctx),
            ambassador_code: string::utf8(ambassador_code),
            first_action: string::utf8(first_action),
            issued_at_ms,
        };

        let badge_id = object::id(&badge);
        registry.total_issued = registry.total_issued + 1;

        event::emit(BadgeIssued {
            badge_id,
            ambassador_code: badge.ambassador_code,
            newcomer,
            first_action: badge.first_action,
            issued_at_ms,
        });

        transfer::transfer(badge, newcomer);
    }

    public fun total_issued(registry: &BadgeRegistry): u64 {
        registry.total_issued
    }

    public fun ambassador_code(badge: &FirstRideBadge): &String {
        &badge.ambassador_code
    }

    public fun first_action(badge: &FirstRideBadge): &String {
        &badge.first_action
    }
}
