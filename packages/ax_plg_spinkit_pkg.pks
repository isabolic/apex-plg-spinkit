--------------------------------------------------------
--  DDL for Package AX_PLG_SPINKIT_PKG
--------------------------------------------------------

  CREATE OR REPLACE PACKAGE "AX_PLG_SPINKIT_PKG"
as

    function spinkit(
        p_dynamic_action      in apex_plugin.t_dynamic_action,
        p_plugin              in apex_plugin.t_plugin
    ) return apex_plugin.t_dynamic_action_render_result;

end ax_plg_spinkit_pkg;

/
