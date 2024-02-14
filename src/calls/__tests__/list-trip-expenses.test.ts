import { describe, expect, it } from 'vitest';
import { initialiseClientAndMockPool } from '../../test-utils';

describe("list trip expenses", () => {
    it("should list trip expenses", async () => {
    const { client, mockPool } = initialiseClientAndMockPool();

        mockPool.intercept({
            path: "/v1/trips/expense?trip_ids=129769b3470354568ae6995e7b3c70f5",
            method: "GET",

        }).reply(200, {
            "items": [
              {
                "trip_id": "871c120e54cb4c58b4fb5ee457bb968a",
                "expense": {
                  "parking": 35,
                  "toll_charge": 10
                },
                "extra": {
                  "distance_with_trailer_in_km": 10
                }
              },
              {
                "trip_id": "0e2d0a84463e411dbedab16560b60430",
                "expense": {
                  "ferry": 110
                },
                "extra": {
                  "distance_with_trailer_in_km": 10
                }
              },
              {
                "trip_id": "129769b3470354568ae6995e7b3c70f5",
                "expense": {},
                "extra": {}
              }
            ]
          }).times(1)

          const TripExpenses = await client.listTripExpenses({
            query: {
              trip_ids: [
                "129769b3470354568ae6995e7b3c70f5",
              ]

            }
          });

          expect(TripExpenses).toMatchSnapshot();
    })
})