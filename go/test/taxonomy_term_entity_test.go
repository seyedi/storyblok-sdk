package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/storyblok-sdk/go"
	"github.com/voxgig-sdk/storyblok-sdk/go/core"

	vs "github.com/voxgig-sdk/storyblok-sdk/go/utility/struct"
)

func TestTaxonomyTermEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.TaxonomyTerm(nil)
		if ent == nil {
			t.Fatal("expected non-nil TaxonomyTermEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := taxonomy_termBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "taxonomy_term." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set STORYBLOK_SDK_TEST_TAXONOMY_TERM_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		taxonomyTermRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.taxonomy_term")))
		var taxonomyTermRef01Data map[string]any
		if len(taxonomyTermRef01DataRaw) > 0 {
			taxonomyTermRef01Data = core.ToMapAny(taxonomyTermRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = taxonomyTermRef01Data

		// LOAD
		taxonomyTermRef01Ent := client.TaxonomyTerm(nil)
		taxonomyTermRef01MatchDt0 := map[string]any{
			"id": taxonomyTermRef01Data["id"],
		}
		taxonomyTermRef01DataDt0Loaded, err := taxonomyTermRef01Ent.Load(taxonomyTermRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		taxonomyTermRef01DataDt0LoadResult := core.ToMapAny(entityData(taxonomyTermRef01DataDt0Loaded))
		if taxonomyTermRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if taxonomyTermRef01DataDt0LoadResult["id"] != taxonomyTermRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func taxonomy_termBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "taxonomy_term", "TaxonomyTermTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read taxonomy_term test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse taxonomy_term test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"taxonomy_term01", "taxonomy_term02", "taxonomy_term03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("STORYBLOK_SDK_TEST_TAXONOMY_TERM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"STORYBLOK_SDK_TEST_TAXONOMY_TERM_ENTID": idmap,
		"STORYBLOK_SDK_TEST_LIVE":      "FALSE",
		"STORYBLOK_SDK_TEST_EXPLAIN":   "FALSE",
		"STORYBLOK_SDK_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["STORYBLOK_SDK_TEST_TAXONOMY_TERM_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["STORYBLOK_SDK_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["STORYBLOK_SDK_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewStoryblokSdkSDK(core.ToMapAny(mergedOpts))
	}

	live := env["STORYBLOK_SDK_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["STORYBLOK_SDK_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
