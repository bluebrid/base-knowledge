from behave.tag_matcher import ActiveTagMatcher, setup_active_tag_values
import sys
from framework.webapp import webapp

# -----------------------------------------------------------------------------
# REQUIRE: python >= 3.4
# -----------------------------------------------------------------------------
#require_min_python_version("3.4")


# -----------------------------------------------------------------------------
# SUPPORT: Active-tags
# -----------------------------------------------------------------------------
# -- MATCHES ANY TAGS: @use.with_{category}={value}
# NOTE: active_tag_value_provider provides category values for active tags.
python_version = "%s.%s" % sys.version_info[:2]
active_tag_value_provider = {
    "python.version": python_version,
}
active_tag_matcher = ActiveTagMatcher(active_tag_value_provider)


# -----------------------------------------------------------------------------
# HOOKS:
# -----------------------------------------------------------------------------
def before_all(context):
    context.driver = webapp.driver
    setup_active_tag_values(active_tag_value_provider, context.config.userdata)
    print("====================================before_all")


def before_feature(context, feature):
    if active_tag_matcher.should_exclude_with(feature.tags):
        feature.skip(reason=active_tag_matcher.exclude_reason)
    print("====================================before_feature")

def before_scenario(context, scenario):
    if active_tag_matcher.should_exclude_with(scenario.effective_tags):
        scenario.skip(reason=active_tag_matcher.exclude_reason)
    print("====================================before_scenario")

def after_all(context):
    #context.driver.quit()
    print("====================================after_all")
    